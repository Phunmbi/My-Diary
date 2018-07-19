/* eslint-disable */
let db = require("../Server/src/db");
let chai = require("chai");
let { address } = require("../Server/src/index");

let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Entries", () => {
  // Testing /POST
  describe("/POST entries", () => {
    it("it should POST a new entry", done => {
      let entry = {
        title: "Met a female dragon",
        details: "had a fire conversation"
      };
      chai
        .request("http://localhost:3000/api/v1")
        .post("/entries")
        .send(entry)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
  });

  // Test the /GET route
  describe("/GET database", () => {
    it("it should GET all the entries", done => {
      chai
        .request("http://localhost:3000/api/v1")
        .get("/entries")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });

  // Test the /GET route
  describe("/GET entry", () => {
    it("it should GET a single entry", done => {
      let entry = {
        title: "Met a bagel",
        details: "Asked if i had seen scones recently"
      };
      let save = db.addOne(entry);
      chai
        .request("http://localhost:3000/api/v1")
        .get("/entries/" + save[db.database.length - 1].id)
        .send(entry)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("details");
          res.body.should.have.property("id");
          done();
        });
    });
  });

  // Test the /PUT route
  describe("/PUT/:id entry", () => {
    it("it should UPDATE an entry given the id", done => {
      let entry = {
        title: "Met a band",
        details: "Asked if i had seen clefs"
      };
      let save = db.addOne(entry);
      chai
        .request("http://localhost:3000/api/v1")
        .put("/entries/" + save[db.database.length - 1].id)
        .send({ title: "Met a wand" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Entry updated successfully");
          done();
        });
    });
  });

  // Test the /DELETE route
  describe("/DELETE/:id entry", () => {
    it("it should DELETE an entry given the id", done => {
      let entry = {
        title: "Met a band",
        details: "Asked if i had seen clefs"
      };
      let save = db.addOne(entry);
      chai
        .request("http://localhost:3000/api/v1")
        .delete("/entries/" + save[db.database.length - 1].id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("This entry has been removed");
          done();
        });
    });
  });
});
