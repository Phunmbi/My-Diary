/* eslint-disable */
let db = require("../Server/src/db");
let chai = require("chai");
let { address } = require("../Server/src/index");

let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Entries', () => {
    // Testing /POST 
    describe('/POST entries', () => {
        it('it should not POST a book without pages field', (done) => {
            let entry = {
                title: "Met a female dragon",
                details: "had a fire conversation"
            }
            chai.request('http://localhost:3000/api/v1')
                .post('/entries')
                .send(entry)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });

    });

});