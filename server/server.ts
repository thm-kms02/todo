import express = require('express');
import mysql = require('mysql');
import {Connection, MysqlError} from "mysql";
import { Request, Response } from 'express';
import {Aufgabe} from '../aufgabe';
import {User} from "../User";

const app = express();
const database : Connection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ksm02'
});
let loggeduser: User = new User("jkj","ghd",1);
const basedir: string = __dirname + '/../'
app.use("/", express.static(basedir + '/client/'));
app.use("/", express.static(basedir + '/CSS/'));
app.use("/", express.static(basedir));

app.use(express.json());

app.listen(8080, () => {
    console.log('Server started at http://localhost:8080');
});

database.connect( (err: MysqlError) => {
    if (err) {
        console.log('Database connection failed: ', err);
    } else {
        console.log('Database is connected');
    }
});
app.post('/addCategory', (req: Request, res: Response) =>{
    let cat: string = req.body.newCat;
    let data: [number, string] = [loggeduser.id, cat];
    let query: string ='INSERT INTO kategorie (nutzer, katName) VALUES (?,?);';
    database.query(query, data ,(err: MysqlError, rows: any) => {
        if(err) {
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
    })
});
app.post('/addTask', (req: Request, res: Response) => {
    console.log("Hallo: " + req.body.ueberschrift);
    let task: Aufgabe = new Aufgabe( req.body.ueberschrift, req.body.beschreibung,  req.body.category);
    let data: [number,string,string,number,number] = task.toArray();
    let query: string ='INSERT INTO aufgabe (benutzer, ueberschrift, beschreibung, prio, kategorie) VALUES (1, ?, ?, 1, ?);';
    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            console.log("Task added");
            res.status(200).send({
                message: 'Aufgabe erfolgreich angelegt'
            });

        }
    })
});

app.get('/loadTasks', (req: Request, res: Response) => {
    let data: [number] = [loggeduser.id];
    let query: string ='SELECT * FROM aufgabe WHERE benutzer = ?';
    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {

            res.status(200).send({
                result: rows
            });
        }
    })
});

app.get('/todoliste',(req: Request,res: Response)=>{
    let query: string = 'SELECT * FROM aufgabe;';
    database.query(query,(err,rows:any)=>{
        if (err){
            //Database failed
            res.status(500).send({
                message: 'Database request failed:'+ err
            });
        }else{
            //create todolist
            const todoList: Aufgabe[]=[];
            for (const row of rows){
                todoList.push(new Aufgabe(
                    row.id,
                    row.user,
                row.ueberschrift,
                row.beschreibung,
                row.kategorie,
                    row.prio,
                ));

            }
            res.status(200).send({
                todoList: todoList,
                message:'Successfully request Todoliste'
            })

        }
    })

});


app.post('/create', (req: Request, res: Response) => {
    const email: string = req.body.email;
    let vorname: string = req.body.vorname;
    let nachname: string = req.body.nachname;
    const passwort: string = req.body.passwort;
    let data = [email,vorname,nachname,passwort];
    console.log(email);

    if (email === "" || vorname === "" || nachname === "" || passwort =="") {
        res.status(400);
        res.send("Nicht alle Inputfelder wurden ausgefüllt !");
    } else {
        const cQuery: string = "INSERT INTO nutzer (email, vorname, nachname,  passwort ) VALUES (?, ?, ?, ?);";
        database.query(cQuery, data, (err) => {

            if (err === null) {
                res.status(201);
                res.send(" Nutzer wurde erstellt");

            } else if (err.errno == 1062) {
                res.status(500);


                res.send("Email ist bereits vorhanden. ");
            } else {
                res.sendStatus(500);

            }
        });
    }
});
