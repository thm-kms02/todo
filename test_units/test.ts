
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