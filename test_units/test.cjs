const chain = require('chai');
const chaiHttps = require('chai-http');
const host = require('../server/server');

chain.should();
chain.use(chaiHttps);
describe('Post /create', function () {
    it('should create a new Account', function (done) {
        const account = {
            email: "dieter@web.de",
            vorname: "Dieter",
            nachname: "Mainder",
            passwort: "passwefrg"
        };
        chain.request('http://localhost:8080')
            .post('/create')
            .send(account)
            .end(function (err, response) {
                console.log(response);
                response.should.have.status(201);
                done();
            });
    });
    it('Register without email should fail', function (done) {
        const account = {
            vorname: "Dieter",
            nachname: "Mainder",
            passwort: "passwefrg"
        };
        chain.request('http://localhost:8080')
            .post('/create')
            .send(account)
            .end(function (err, response) {
                response.should.have.status(500);
                done();
            });
    });
    it('should load tasks of user with id 1', function (done) {
        const userid = {
            id: "1"
        };
        chain.request('http://localhost:8080')
            .get('/loadtasks')
            .send(userid)
            .end(function (err, response) {
                response.should.have.status(200);
                done();
            });
    });
    it('should login a user', function (done) {
        const login = {
            email: "dieter@web.de",
            passwort: "passwefrg"
        };
        chain.request('http://localhost:8080')
            .post('/login')
            .send(login)
            .end(function (err, response) {
                response.should.have.status(500);
                done();
            });
    });
    it('Login without password should fail', function (done) {
        const login = {
            email: "dieter@web.de"
        };
        chain.request('http://localhost:8080')
            .post('/login')
            .send(login)
            .end(function (err, response) {
                response.should.have.status(500);
                done();
            });
    });
    it('should create a new Category', function (done) {
        const Category = {
            newCat: "test"
        };
        chain.request('http://localhost:8080')
            .post('/addCategory')
            .send(Category)
            .end(function (err, response) {
                response.should.have.status(200);
                done();
            });
    });
    it('should create a new Category', function (done) {
        const Category = {
            newCat: ""
        };
        chain.request('http://localhost:8080')
            .post('/addCategory')
            .send(Category)
            .end(function (err, response) {
                response.should.have.status(400);
                done();
            });
    });
    it('should load and create the task on mainpage if logged in', function (done) {
        const Todoliste = {
            id: "",
            user: "",
            ueberschrift: "",
            beschreibung: "",
            kategorie: "",
            prio: "",
        };
        chain.request('http://localhost:8080')
            .get('/todoliste')
            .send(Todoliste)
            .end(function (err, response) {
                response.should.have.status(200);
                done();
            });
    });
    /*  it('should create a new Task', function (done) {
          var Task = {
              ueberschrift: "test",
              beschreibung: "t",
              category: 1
          };
          chain.request('http://localhost:8080')
              .post('/addTask')
              .send(Task)
              .end(function (err, response) {
              response.should.have.status(200);
              done();
          });
      });*/
    it('should not create a new Task', function (done) {
        const Task = {
            ueberschrift: "",
            beschreibung: "",
            category: 1,
        };
        chain.request('http://localhost:8080')
            .post('/addTask')
            .send(Task)
            .end(function (err, response) {
                response.should.have.status(400);
                done();
            });
    });
});

/*describe('Get/loadTasks)', function () {
});
describe('Post /login', function () {
});
describe('Post /addCategory', function () {
});
describe('Get/todoliste)', function () {
});
describe('Post /addTask', function () {
});*/
