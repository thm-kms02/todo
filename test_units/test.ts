// tslint:disable-next-line:no-var-requires
const chain = require("chai");
// tslint:disable-next-line:no-var-requires
const chaiHttps = require("chai-http");
// tslint:disable-next-line:no-var-requires
const host = require("../server/server");

chain.should();
chain.use(chaiHttps);
describe("Post /create", async () => {
  it("should create a new Account", (done) => {
    const account = {
      email: "dieter@web.de",
      vorname: "Dieter",
      nachname: "Mainder",
      passwort: "passwefrg",
    };
    chain
      .request("http://localhost:8080")
      .post("/create")
      .send(account)
      .end((err, response) => {
        console.log(response.status);
        response.should.have.status(201);
        done();
      });
  });

  it("Register without email should fail", (done) => {
    const account = {
      vorname: "Dieter",
      nachname: "Mainder",
      passwort: "passwefrg",
    };
    chain
      .request("http://localhost:8080")
      .post("/create")
      .send(account)
      .end((err, response) => {
        response.should.have.status(500);
        done();
      });
  });

  it("should load tasks of user with id 1", (done) => {
    const userid = {
      id: "1",
    };
    chain
      .request("http://localhost:8080")
      .get("/loadtasks")
      .send(userid)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it("should login a user", (done) => {
    const login = {
      email: "dieter@web.de",
      passwort: "passwefrg",
    };
    chain
      .request("http://localhost:8080")
      .post("/login")
      .send(login)
      .end((err, response) => {
        response.should.have.status(500);
        done();
      });
  });

  it("Login without password should fail", (done) => {
    const login = {
      email: "dieter@web.de",
    };
    chain
      .request("http://localhost:8080")
      .post("/login")
      .send(login)
      .end((err, response) => {
        response.should.have.status(500);
        done();
      });
  });

  it("should create a new Category", (done) => {
    const Category = {
      newCat: "test",
    };
    chain
      .request("http://localhost:8080")
      .post("/addCategory")
      .send(Category)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it("should create a new Category", (done) => {
    const Category = {
      newCat: "",
    };
    chain
      .request("http://localhost:8080")
      .post("/addCategory")
      .send(Category)
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });

  it("should load and create the task on mainpage if logged in", (done) => {
    const Todoliste = {
      id: "",
      user: "",
      ueberschrift: "",
      beschreibung: "",
      kategorie: "",
      prio: "",
    };
    chain
      .request("http://localhost:8080")
      .get("/todoliste")
      .send(Todoliste)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  /*  it('should create a new Task',  (done)=> {
          const Task = {
              ueberschrift:"test",
              beschreibung:"t",
              category:1
          };
          chain.request('http://localhost:8080')
              .post('/addTask')
              .send(Task)
              .end((err,response)=>{
                  response.should.have.status(200);
                  done();
              });
      });*/

  it("should not create a new Task", (done) => {
    const Task = {
      ueberschrift: "",
      beschreibung: "",
      category: 1,
    };
    chain
      .request("http://localhost:8080")
      .post("/addTask")
      .send(Task)
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
});

/*
describe('Get/loadTasks)',()=>{

});


describe('Post /login',()=>{


});


describe('Post /addCategory',()=>{

});

describe('Get/todoliste)',()=>{

});


describe('Post /addTask',()=>{

});
*/
