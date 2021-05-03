
const chain = require('chai');
const chaiHttps= require('chai-http');
const  host = require('../server/server');
//assertion

chain.should();
chain.use(chaiHttps);
describe('Post /create',()=>{
    it('should create a new Account',  (done)=> {
        const account = {
            email:"dieter@web.de",
            vorname:"Dieter",
            nachname: "Mainder",
            passwort: "passwefrg"

        };
        chain.request('http://localhost:8080')
            .post('/create')
            .send(account)
            .end((err,response)=>{
                response.should.have.status(201);
                done();
            });
    });
});

describe('Post /addTask',()=>{
    it('should add a new Task to Database',  (done)=> {
        const Task = {
            user:"1",
            ueberschrift:"Milch",
            beschreibung: "Milch einkaufen",
            prio: "1",
            category: "1"

        };

        chain.request('http://localhost:8080')
            .post('/addTask')
            .send(Task)
            .end((err,response)=>{
                if(response.status == 200) {
                    done()
                } else {
                    return err;
                }
            });
    });
    it('should fail',  (done)=> {

        const Task2 = {
        }

        chain.request('http://localhost:8080')
            .post('/addTask')
            .send(Task2)
            .end((err,response)=>{
                if(response.status == 500) {
                    done()
                } else {
                    return err;
                }
            });
    });
});
