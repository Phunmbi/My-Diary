// This code was written based off of this tutorial from Scotch.io
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

import chai from 'chai';
import chaiHttp from 'chai-http';
import { addOne } from '../Server/src/db';
import server from '../Server/src/index';

const should = chai.should();

chai.use(chaiHttp);

describe('Entries', () => {
  // Testing /POST
  describe('/POST entries', () => {
    it('it should POST a new entry', (done) => {
      const entry = {
        title: 'Met a female dragon',
        details: 'had a fire conversation'
      };
      chai
        .request('http://localhost:3000/api/v1')
        .post('/entries')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('title');
          res.body.data.should.have.property('details');
          res.body.data.should.have.property('id');
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.data.should.have
            .property('title')
            .eql(entry.title);
          done();
          res.body.data.should.have
            .property('details')
            .eql(entry.details);
        });
    });
  });

  // Test the /GET route
  describe('/GET database', () => {
    it('it should GET all the entries', (done) => {
      chai
        .request('http://localhost:3000/api/v1')
        .get('/entries')
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Entire database');
            done();
          }
        });
    }).timeout(17000);
  });

  // Test the /GET route
  describe('/GET entry', () => {
    it('it should GET a single entry', (done) => {
      const entry = {
        title: 'Met a bagel',
        details: 'Asked if i had seen scones recently'
      };
      const save = addOne(entry);
      chai
        .request('http://localhost:3000/api/v1')
        .get(`/entries/${save.id}`)
        .send(entry)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.data.should.have
            .property('title')
            .eql(entry.title);
          res.body.data.should.have
            .property('details')
            .eql(entry.details);
          done();
        });
    });
  });

  // Test the /PUT route
  describe('/PUT/:id entry', () => {
    it('it should UPDATE an entry given the id', (done) => {
      const entry = {
        title: 'Met a band',
        details: 'Asked if i had seen clefs'
      };
      const newTitle = 'Met a wand';
      const save = addOne(entry);
      chai
        .request('http://localhost:3000/api/v1')
        .put(`/entries/${save.id}`)
        .send(newTitle)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.data.should.have.property('id');
          done();
        });
    });
  });

  // Test the /DELETE route
  describe('/DELETE/:id entry', () => {
    it('it should DELETE an entry given the id', (done) => {
      const entry = {
        title: 'Met a band',
        details: 'Asked if i had seen clefs'
      };
      const save = addOne(entry);
      chai
        .request('http://localhost:3000/api/v1')
        .delete(`/entries/${save.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          done();
        });
    });
  });
});
