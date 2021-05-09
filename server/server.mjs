"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql = require("mysql");
var aufgabe_1 = require("../aufgabe");
var User_1 = require("../User");
var app = express();
var database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ksm02'
});
var loggeduser = new User_1.User("jkj", "ghd", 1);
var basedir = __dirname + '/../';
app.use("/", express.static(basedir + '/client/'));
app.use("/", express.static(basedir + '/CSS/'));
app.use("/", express.static(basedir));
app.use(express.json());
app.listen(8080, function () {
    console.log('Server started at http://localhost:8080');
});
database.connect(function (err) {
    if (err) {
        console.log('Database connection failed: ', err);
    }
    else {
        console.log('Database is connected');
    }
});
app.post('/addCategory', function (req, res) {
    var cat = req.body.newCat;
    cat = cat.trim();
    console.log("Test: " + cat);
    if (cat === "") {
        res.status(400).send({
            message: "Bad Input"
        });
    }
    else {
        var data = [loggeduser.id, cat];
        var query = 'INSERT INTO kategorie (nutzer, katName) VALUES (?,?);';
        database.query(query, data, function (err) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: 'Database request failed: ' + err
                });
            }
            else {
                res.status(200).send({
                    message: 'Category added'
                });
            }
        });
    }
});
app.post('/addTask', function (req, res) {
    console.log("Hallo: " + req.body.ueberschrift);
    if (req.body.ueberschrift.length < 1 || req.body.beschreibung.length < 1) {
        res.status(400).send({
            message: "Bad Input"
        });
    }
    else {
        var task = new aufgabe_1.Aufgabe(1, req.body.ueberschrift.toString(), req.body.beschreibung.toString());
        var data = task.toArray();
        var query = 'INSERT INTO aufgabe (benutzer, ueberschrift, beschreibung, prio, kategorie) VALUES (1, ?, ?, 1, ?);';
        database.query(query, data, function (err) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: 'Database request failed: ' + err
                });
            }
            else {
                console.log("Task added");
                res.status(200).send({
                    message: 'Aufgabe erfolgreich angelegt'
                });
            }
        });
    }
});
app.get('/loadtasks', function (req, res) {
    var data = [1];
    var query = 'SELECT * FROM aufgabe WHERE benutzer = ?';
    database.query(query, data, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                result: rows
            });
        }
    });
});
app.get('/todoliste', function (req, res) {
    var query = 'SELECT * FROM aufgabe;';
    database.query(query, function (err, rows) {
        if (err) {
            // Database failed
            res.status(500).send({
                message: 'Database request failed:' + err
            });
        }
        else {
            // create todolist
            var todoList = [];
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                todoList.push(new aufgabe_1.Aufgabe(row.id, row.user, row.ueberschrift, row.beschreibung, row.kategorie, row.prio));
            }
            res.status(200).send({
                todoList: todoList,
                message: 'Successfully request Todoliste'
            });
        }
    });
});
app.post('/create', function (req, res) {
    var email = req.body.email;
    var vorname = req.body.vorname;
    var nachname = req.body.nachname;
    var passwort = req.body.passwort;
    var data = [email, vorname, nachname, passwort];
    if (email === "" || vorname === "" || nachname === "" || passwort === "") {
        res.status(400);
        res.send("Nicht alle Inputfelder wurden ausgefüllt !");
    }
    else {
        var cQuery = "INSERT INTO nutzer (email, vorname, nachname,  passwort ) VALUES (?, ?, ?, ?);";
        database.query(cQuery, data, function (err) {
            if (err === null) {
                res.status(201);
                res.send(" Nutzer wurde erstellt");
            }
            else if (err.errno === 1062) {
                res.status(500);
                res.send("Email ist bereits vorhanden. ");
            }
            else {
                res.sendStatus(500);
            }
        });
    }
});
app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var data = [email, password];
    if (email === "" || password === "") {
        res.status(400);
        res.send("Alle Inputfelder müssen ausgefüllt werden");
    }
    else {
        var cQuery = 'SELECT * FROM nutzer WHERE email=? And password=?';
        database.query(cQuery, data, function (err, results) {
            if (err === null && results.length > 0) {
                res.status(201);
                res.send(" Nutzer erfolgreich  eingellogt");
            }
            else if (err.errno === 1062) {
                res.status(500);
                res.send("Nutzer ist nicht vorhanden.");
            }
            else {
                res.sendStatus(500);
            }
        });
    }
});
