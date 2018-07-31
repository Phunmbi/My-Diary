// This code was written based off of this tutorial from Scotch.io
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

import chai from 'chai';
import chaiHttp from 'chai-http';
import { client } from '../models/db';
import server from '../index';
import { createEntriesTable, createUsersTable } from '../models/schema';

const should = chai.should();

chai.use(chaiHttp);

describe('Entries', () => {
  // First clear database if they already exist
  client.query('DROP TABLE IF EXISTS entries, users', (err, res) => {
    if (err) {
      console.log(err);
    }
  });

  // Then create them fresh
  createUsersTable();
  createEntriesTable();

  // Testing for Users
  // Testing /POST
  describe('/POST new users', () => {
    it('it should POST a new user', (done) => {
      const entry = {
        firstName: 'Funmbi',
        lastName: 'Adeniyi',
        email: 'phunmbi@gmail.com',
        password: 'testing'
      };
      chai
        .request('localhost:3000/api/v1')
        .post('/auth/signup')
        .send(entry)
        .end((err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('userid');
            res.body.data.should.have.property('firstname');
            res.body.data.should.have.property('lastname');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('password');
            res.body.data.should.have
              .property('firstname')
              .eql('funmbi');
            res.body.data.should.have
              .property('email')
              .eql('phunmbi@gmail.com');
            res.body.data.should.have
              .property('lastname')
              .eql('adeniyi');
            res.body.data.should.have
              .property('password')
              .eql('testing');
            done();
          }
        });
    });
  });

  // Testing Signup
  describe('/POST new users', () => {
    it('it should ACCESS an existing user', (done) => {
      const entry = {
        email: 'phunmbi@gmail.com',
        password: 'testing'
      };
      chai
        .request('localhost:3000/api/v1')
        .post('/auth/signin')
        .send(entry)
        .end((err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('password');
            res.body.data.should.have
              .property('email')
              .eql('phunmbi@gmail.com');
            res.body.data.should.have
              .property('password')
              .eql('testing');
            done();
          }
        });
    });
  });

  // Testing /POST
  describe('/POST entries', () => {
    it('it should POST a new entry', (done) => {
      const entry = {
        email: 'phunmbi@gmail.com',
        title: 'Met a female dragon',
        details: 'had a fire conversation'
      };
      chai
        .request('localhost:3000/api/v1')
        .post('/entries')
        .send(entry)
        .end((err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('title');
            res.body.data.should.have.property('details');
            res.body.data.should.have.property('entryid');
            res.body.should.have.property('message');
            res.body.should.have.property('status');
            res.body.should.have
              .property('message')
              .eql('A new entry has been added');
            res.body.data.should.have
              .property('email')
              .eql('phunmbi@gmail.com');
            res.body.data.should.have
              .property('title')
              .eql('Met a female dragon');
            res.body.data.should.have
              .property('details')
              .eql('had a fire conversation');
            done();
          }
        });
    });
  });

  // Test the /GET route
  describe('/GET database', () => {
    it('it should GET all the entries', (done) => {
      chai
        .request('localhost:3000/api/v1')
        .get('/entries')
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('All records displayed');
            done();
          }
        });
    });

    it('it should return an error while trying to GET a route that does not exist', (done) => {
      chai
        .request('localhost:3000/api/v')
        .get('/entries')
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have
              .property('message')
              .eql('Error, Page not found');
            done();
          }
        });
    });

    it('it should GET the entry page to all APIs', (done) => {
      chai
        .request('localhost:3000')
        .get('/')
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have
              .property('message')
              .eql('Welcome to the MyDiary APIs');
            done();
          }
        });
    });

    it('it should GET the entry page to the users API', (done) => {
      chai
        .request('localhost:3000')
        .get('/api/v1/auth')
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have
              .property('message')
              .eql('Welcome to the user authentication APIs');
            done();
          }
        });
    });
  });

  // Test the /GET route
  describe('/GET entry', () => {
    it('it should GET a single entry', (done) => {
      const entry = {
        email: 'phunmbi@gmail.com',
        title: 'Met a bagel',
        details: 'Asked if i had seen scones recently'
      };
      client.query('INSERT INTO entries(email, title, details, last_time_edited, userid) VALUES ( $1, $2, $3, Now(), (SELECT userid FROM users WHERE email = $4)) RETURNING *', [entry.email, entry.title, entry.details, entry.email], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          const data = response.rows[0];
          chai
            .request('localhost:3000/api/v1')
            .get(`/entries/${data.entryid}`)
            .send(entry)
            .end((err, res) => {
              if (err) {
                console.log(err);
              } else {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('message');
                res.body.should.have.property('status');
                res.body.should.have
                  .property('message')
                  .eql('Single entry displayed');
                res.body.data.should.have
                  .property('email')
                  .eql('phunmbi@gmail.com');
                res.body.data.should.have
                  .property('title')
                  .eql('Met a bagel');
                res.body.data.should.have
                  .property('details')
                  .eql('Asked if i had seen scones recently');
                done();
              }
            });
        }
      });
    });

    it('it should not GET an entry when it does not exist', (done) => {
      const entry = {
        email: 'phunmbi@gmail.com',
        title: 'Met a bagel',
        details: 'Asked if i had seen scones recently'
      };
      client.query('INSERT INTO entries(email, title, details, last_time_edited, userid) VALUES ( $1, $2, $3, Now(), (SELECT userid FROM users WHERE email = $4)) RETURNING *', [entry.email, entry.title, entry.details, entry.email], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          chai
            .request('localhost:3000/api/v1')
            .get('/entries/1000000')
            .send(entry)
            .end((err, res) => {
              if (err) {
                console.log(err);
              } else {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('status');
                res.body.should.have
                  .property('message')
                  .eql('Entry does not exist');
                done();
              }
            });
        }
      });
    });
  });

  // Test the /PUT route
  describe('/PUT/:id entry', () => {
    it('it should UPDATE an entry given the id', (done) => {
      const entry = {
        email: 'phunmbi@gmail.com',
        title: 'Met a band',
        details: 'Asked if i had seen clefs'
      };
      client.query('INSERT INTO entries(email, title, details, last_time_edited, userid) VALUES ( $1, $2, $3, Now(), (SELECT userid FROM users WHERE email = $4)) RETURNING *', [entry.email, entry.title, entry.details, entry.email], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          const data = response.rows[0];
          chai
            .request('localhost:3000/api/v1')
            .put(`/entries/${data.entryid}`)
            .send({ email: 'phunmbi@gmail.com', title: 'Met a wand', details: 'Asked if i had seen clefs' })
            .end((err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('status');
                res.body.should.have
                  .property('message')
                  .eql('This entry has been successfully edited');
                done();
              }
            });
        }
      });
    });

    it('it should not UPDATE an entry when the entry does not exist.', (done) => {
      const entry = {
        email: 'phunmbi@gmail.com',
        title: 'Met a band',
        details: 'Asked if i had seen clefs'
      };
      client.query('INSERT INTO entries(email, title, details, last_time_edited, userid) VALUES ( $1, $2, $3, Now(), (SELECT userid FROM users WHERE email = $4)) RETURNING *', [entry.email, entry.title, entry.details, entry.email], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          chai
            .request('localhost:3000/api/v1')
            .put('/entries/10000')
            .send({ email: 'phunmbi@gmail.com', title: 'Met a wand', details: 'Asked if i had seen clefs' })
            .end((err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('status');
                res.body.should.have
                  .property('message')
                  .eql('This entry was not modified successfully.');
                done();
              }
            });
        }
      });
    });
  });

  // Test the /DELETE route
  describe('/DELETE/:id entry', () => {
    it('it should DELETE an entry given the id', (done) => {
      const entry = {
        email: 'phunmbi@gmail.com',
        title: 'Met a band',
        details: 'Asked if i had seen clefs'
      };
      client.query('INSERT INTO entries(email, title, details, last_time_edited, userid) VALUES ( $1, $2, $3, Now(), (SELECT userid FROM users WHERE email = $4)) RETURNING *', [entry.email, entry.title, entry.details, entry.email], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          const data = response.rows[0];
          chai
            .request('localhost:3000/api/v1')
            .delete(`/entries/${data.entryid}`)
            .end((err, res) => {
              if (err) {
                console.log(err);
              } else {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('status');
                res.body.should.have
                  .property('message')
                  .eql('The entry was successfully deleted');
                done();
              }
            });
        }
      });
    });

    it('it should not DELETE an entry if the given id does not exist', (done) => {
      const entry = {
        email: 'phunmbi@gmail.com',
        title: 'Met a band',
        details: 'Asked if i had seen clefs'
      };
      client.query('INSERT INTO entries(email, title, details, last_time_edited, userid) VALUES ( $1, $2, $3, Now(), (SELECT userid FROM users WHERE email = $4)) RETURNING *', [entry.email, entry.title, entry.details, entry.email], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          chai
            .request('localhost:3000/api/v1')
            .delete('/entries/989999')
            .end((err, res) => {
              if (err) {
                console.log(err);
              } else {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('status');
                res.body.should.have
                  .property('message')
                  .eql('This entry was not deleted successfully');
                done();
              }
            });
        }
      });
    });
  });
});
