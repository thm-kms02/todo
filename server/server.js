"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mysql = require("mysql");
const aufgabe_1 = require("../aufgabe");
const User_1 = require("../User");
const app = express();
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ksm02",
});
const loggeduser = new User_1.User("jkj", "ghd", 1);
const basedir = __dirname + "/../";
app.use("/", express.static(basedir + "/client/"));
app.use("/", express.static(basedir + "/CSS/"));
app.use("/", express.static(basedir));
app.use(express.json());
app.listen(8080, function () {
  console.log("Server started at http://localhost:8080");
});
database.connect(function (err) {
  if (err) {
    console.log("Database connection failed: ", err);
  } else {
    console.log("Database is connected");
  }
});
app.post("/addCategory", function (req, res) {
  let cat;
  cat = req.body.newCat;
  cat = cat.trim();
  console.log("Test: " + cat);
  if (cat === "") {
    res.status(400).send({
      message: "Bad Input",
    });
  } else {
    const data = [loggeduser.id, cat];
    const query = "INSERT INTO kategorie (nutzer, katName) VALUES (?,?);";
    database.query(query, data, function (err) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Database request failed: " + err,
        });
      } else {
        res.status(200).send({
          message: "Category added",
        });
      }
    });
  }
});
app.post("/addTask", function (req, res) {
  console.log("Hallo: " + req.body.ueberschrift);
  if (req.body.ueberschrift.length < 1 || req.body.beschreibung.length < 1) {
    res.status(400).send({
      message: "Bad Input",
    });
  } else {
    const task = new aufgabe_1.Aufgabe(
      1,
      req.body.ueberschrift.toString(),
      req.body.beschreibung.toString()
    );
    const data = task.toArray();
    const query =
      "INSERT INTO aufgabe (benutzer, ueberschrift, beschreibung, prio, kategorie) VALUES (1, ?, ?, 1, ?);";
    database.query(query, data, function (err) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Database request failed: " + err,
        });
      } else {
        console.log("Task added");
        res.status(200).send({
          message: "Aufgabe erfolgreich angelegt",
        });
      }
    });
  }
});
app.get("/loadtasks", function (req, res) {
  const data = [1];
  const query = "SELECT * FROM aufgabe WHERE benutzer = ?";
  database.query(query, data, function (err, rows) {
    if (err) {
      res.status(500).send({
        message: "Database request failed: " + err,
      });
    } else {
      res.status(200).send({
        result: rows,
      });
    }
  });
});
app.get("/todoliste", function (req, res) {
  const query = "SELECT * FROM aufgabe;";
  database.query(query, function (err, rows) {
    if (err) {
      // Database failed
      res.status(500).send({
        message: "Database request failed:" + err,
      });
    } else {
      // create todolist
      const todolist = [];
      let _i = 0,
        rows_1 = rows;
      for (; _i < rows_1.length; _i++) {
        const row = rows_1[_i];
        todolist.push(
          new aufgabe_1.Aufgabe(
            row.id,
            row.user,
            row.ueberschrift,
            row.beschreibung,
            row.kategorie,
            row.prio
          )
        );
      }
      res.status(200).send({
        todoList: todolist,
        message: "Successfully request Todoliste",
      });
    }
  });
});
app.post("/create", function (req, res) {
  const email = req.body.email;
  const vorname = req.body.vorname;
  const nachname = req.body.nachname;
  const passwort = req.body.passwort;
  const data = [email, vorname, nachname, passwort];
  if (email === "" || vorname === "" || nachname === "" || passwort === "") {
    res.status(400);
    res.send("Nicht alle Inputfelder wurden ausgefüllt !");
  } else {
    const cQuery =
      "INSERT INTO nutzer (email, vorname, nachname,  passwort ) VALUES (?, ?, ?, ?);";
    database.query(cQuery, data, function (err) {
      if (err === null) {
        res.status(201);
        res.send(" Nutzer wurde erstellt");
      } else if (err.errno === 1062) {
        res.status(500);
        res.send("Email ist bereits vorhanden. ");
      } else {
        res.sendStatus(500);
      }
    });
  }
});
app.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const data = [email, password];
  if (email === "" || password === "") {
    res.status(400);
    res.send("Alle Inputfelder müssen ausgefüllt werden");
  } else {
    const cQuery = "SELECT * FROM nutzer WHERE email=? And password=?";
    database.query(cQuery, data, function (err, results) {
      if (err === null && results.length > 0) {
        res.status(201);
        res.send(" Nutzer erfolgreich  eingeloggt");
      } else if (err.errno === 1062) {
        res.status(500);
        res.send("Nutzer ist nicht vorhanden.");
      } else {
        res.sendStatus(500);
      }
    });
  }
});
