// This code was written based off of this tutorial from Scotch.io
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

import chai from 'chai';
import chaiHttp from 'chai-http';
import { client } from '../models/db';
import server from '../index';
import { createEntriesTable, createUsersTable } from '../models/schema';

const should = chai.should();
let token;
let userId;
const tokens = 'Bearer aho;hfliklh[fohaoi haoihfiahkpoikhj iuhapo';

chai.use(chaiHttp);

// First clear database if they already exist
client.query('DROP TABLE IF EXISTS entries, users', (err, res) => {
  if (err) {
    console.log(err);
  }
});

// Then create them fresh
createUsersTable();
createEntriesTable();

// Testing Signup
describe('Users', () => {
  describe('CREATE new users', () => {
    it('should CREATE a new user', (done) => {
      const entry = {
        firstName: 'Funmbi',
        lastName: 'Adeniyi',
        email: 'phunmbi@gmail.com',
        password: 'testing67'
      };
      chai
        .request('localhost:3000/api/v1')
        .post('/auth/signup')
        .send(entry)
        .end((err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.data.should.have.property('firstName');
            res.body.data.should.have.property('lastName');
            res.body.data.should.have
              .property('firstName')
              .eql('funmbi');
            res.body.data.should.have
              .property('lastName')
              .eql('adeniyi');
            done();
          }
        });
    });

    it('should fail to CREATE a new user when the email already exists', (done) => {
      const entry = {
        firstName: 'Funmbi',
        lastName: 'Adeniyi',
        email: 'phunmbi@gmail.com',
        password: 'testing67'
      };
      chai
        .request('localhost:3000/api/v1')
        .post('/auth/signup')
        .send(entry)
        .end((err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('status');
            res.body.should.have
              .property('message')
              .eql('User was not added successfully, email already exists.');
            done();
          }
        });
    });
  });

  // Testing Signin
  describe('LOGIN existing users', () => {
    it('should fail to LOGIN an existing user with wrong email and wrong password', (done) => {
      const entry = {
        email: 'phubi@gmail.com',
        password: 'tenghhnji'
      };
      chai
        .request('localhost:3000/api/v1')
        .post('/auth/login')
        .send(entry)
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
              .eql('Wrong Email or Password');
            done();
          }
        });
    });

    it('should fail to LOGIN an existing user with wrong password', (done) => {
      const entry = {
        email: 'phunmbi@gmail.com',
        password: 'smooth6787'
      };
      chai
        .request('localhost:3000/api/v1')
        .post('/auth/login')
        .send(entry)
        .end((err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('status');
            res.body.should.have
              .property('message')
              .eql('Wrong Email or Password');
            done();
          }
        });
    });

    it('should LOGIN an existing user', (done) => {
      const entry = {
        email: 'phunmbi@gmail.com',
        password: 'testing67'
      };
      chai
        .request('localhost:3000/api/v1')
        .post('/auth/login')
        .send(entry)
        .end((err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('firstName');
            res.body.data.should.have.property('lastName');
            res.body.should.have.property('message');
            res.body.should.have
              .property('message')
              .eql('Authentic User');
            token = `Bearer ${res.body.tokenize}`;
            done();
          }
        });
    });
  });
});

// Testing AUTHORIZATION
describe('Authorization', () => {
  it('should not authorize user to access protected resources', (done) => {
    chai
      .request('localhost:3000/api/v1')
      .get('/entries')
      .set('Authorization', tokens)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Unauthorized');
          done();
        }
      });
  });

  it('should not authorize user to access protected resources without a token', (done) => {
    chai
      .request('localhost:3000/api/v1')
      .get('/entries')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Unauthorized');
          done();
        }
      });
  });
});

// TESTING VALIDATION
describe('Validation', () => {
  // TESTING SIGN UP VALIDATION
  it('should fail to SIGNUP a new user with an empty first name field', (done) => {
    const entry = {
      firstName: ' ',
      lastName: 'Adeniyi',
      email: ' testme@gmailhhl',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/signup')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter your First Name');
          done();
        }
      });
  });

  it('should fail to SIGNUP a new user with an first name field of \'true\'', (done) => {
    const entry = {
      firstName: 'true',
      lastName: 'Adeniyi',
      email: ' testme@gmailhhl',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/signup')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter an acceptable First Name');
          done();
        }
      });
  });

  it('should fail to SIGNUP a new user with an first name field of \'false\'', (done) => {
    const entry = {
      firstName: 'false',
      lastName: 'Adeniyi',
      email: ' testme@gmailhhl',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/signup')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter an acceptable First Name');
          done();
        }
      });
  });

  it('should fail to SIGNUP a new user with an empty last name field', (done) => {
    const entry = {
      firstName: 'Funmbi',
      lastName: ' ',
      email: 'testme@gmailhhl',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/signup')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter your Last Name');
          done();
        }
      });
  });

  it('should fail to SIGNUP a new user with an last name field of \'true\'', (done) => {
    const entry = {
      firstName: 'Steve',
      lastName: 'true',
      email: ' testme@gmailhhl',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/signup')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter an acceptable Last Name');
          done();
        }
      });
  });

  it('should fail to SIGNUP a new user with an last name field of \'false\'', (done) => {
    const entry = {
      firstName: 'Ade',
      lastName: 'false',
      email: ' testme@gmailhhl',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/signup')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter an acceptable Last Name');
          done();
        }
      });
  });

  it('should fail to SIGNUP a new user with email inputed in the wrong format', (done) => {
    const entry = {
      firstName: 'Funmbi',
      lastName: 'Adeniyi',
      email: ' testme@gmailhhl',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/signup')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter an accurate email');
          done();
        }
      });
  });

  it('should fail to SIGNUP a new user with email inputed in the wrong format', (done) => {
    const entry = {
      firstName: 'Funmbi',
      lastName: 'Adeniyi',
      email: ' testmegmail.com',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/signup')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter an accurate email');
          done();
        }
      });
  });

  it('should fail to SIGNUP a new user with a password less than 8 characters', (done) => {
    const entry = {
      firstName: 'Funmbi',
      lastName: 'Adeniyi',
      email: 'testme@gmail.com',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/signup')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Your password should be at least 8 characters long');
          done();
        }
      });
  });

  it('should fail to SIGNUP a new user with an empty password field', (done) => {
    const entry = {
      firstName: 'Funmbi',
      lastName: 'Adeniyi',
      email: 'testme@gmail.com',
      password: ' '
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/signup')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter your password');
          done();
        }
      });
  });

  // TESTING LOG IN VALIDATION
  it('should fail to LOGIN an existing user with email inputed in the wrong format', (done) => {
    const entry = {
      firstName: 'Funmbi',
      lastName: 'Adeniyi',
      email: ' testme@gmailhhl',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/login')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter an accurate email');
          done();
        }
      });
  });

  it('should fail to LOGIN an existing user with email inputed in the wrong format', (done) => {
    const entry = {
      firstName: 'Funmbi',
      lastName: 'Adeniyi',
      email: ' testmegmail.com',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/login')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter an accurate email');
          done();
        }
      });
  });

  it('should fail to LOGIN an existing user with a password less than 8 characters', (done) => {
    const entry = {
      firstName: 'Funmbi',
      lastName: 'Adeniyi',
      email: 'testme@gmail.com',
      password: 'smooth'
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/login')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Your password should be at least 8 characters long');
          done();
        }
      });
  });

  it('should fail to LOGIN a new user with an empty password field', (done) => {
    const entry = {
      firstName: 'Funmbi',
      lastName: 'Adeniyi',
      email: 'testme@gmail.com',
      password: ' '
    };
    chai
      .request('localhost:3000/api/v1')
      .post('/auth/login')
      .send(entry)
      .end((err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('Error');
          res.body.should.have
            .property('Error')
            .eql('Please enter your password');
          done();
        }
      });
  });
});

// Testing /GET
describe('Entries', () => {
  it('should return an empty for new users without entries', (done) => {
    chai
      .request('localhost:3000/api/v1')
      .get('/entries')
      .set('Authorization', token)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res.body);
          res.should.have.status(204);
          done();
        }
      });
  });
});

describe('Entries', () => {
  // Testing /POST
  describe('ADD entries', () => {
    it('should ADD a new entry', (done) => {
      const entry = {
        title: 'Met a female dragon',
        details: 'had a fire conversation'
      };
      chai
        .request('localhost:3000/api/v1')
        .post('/entries')
        .set('Authorization', token)
        .send(entry)
        .end((err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.data.should.have.property('title');
            res.body.data.should.have.property('details');
            res.body.data.should.have.property('user_id');
            res.body.data.should.have.property('id');
            res.body.should.have.property('message');
            res.body.should.have.property('status');
            res.body.should.have
              .property('message')
              .eql('A new entry has been added');
            res.body.data.should.have
              .property('title')
              .eql('Met a female dragon');
            res.body.data.should.have
              .property('details')
              .eql('had a fire conversation');
            userId = res.body.data.user_id;
            done();
          }
        });
    });
  });

  // Test the /GET ALL route
  describe('VIEW entries', () => {
    it('should VIEW all entries', (done) => {
      chai
        .request('localhost:3000/api/v1')
        .get('/entries')
        .set('Authorization', token)
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
  });

  // Test the /GET route
  describe('VIEW entry', () => {
    it('should VIEW a single entry', (done) => {
      const entry = {
        title: 'Met a bagel',
        details: 'Asked if i had seen scones recently'
      };
      client.query('INSERT INTO entries(title, details, time_created, user_id) VALUES ( $1, $2, Now(), $3 ) RETURNING *', [entry.title, entry.details, userId], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          const data = response.rows[0];
          chai
            .request('localhost:3000/api/v1')
            .get(`/entries/${data.id}`)
            .send(entry)
            .set('Authorization', token)
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

    it('should not GET an entry when it does not exist', (done) => {
      const entry = {
        title: 'Met a bagel',
        details: 'Asked if i had seen scones recently'
      };
      client.query('INSERT INTO entries(title, details, time_created, user_id) VALUES ( $1, $2, Now(), $3) RETURNING *', [entry.title, entry.details, userId], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          chai
            .request('localhost:3000/api/v1')
            .get('/entries/1000000')
            .send(entry)
            .set('Authorization', token)
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

  // Test the default entries
  describe('VIEW default routes', () => {
    it('should GET the entry page to all APIs', (done) => {
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

    it('should GET the entry page to the users API', (done) => {
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
    it('should return an error while trying to GET a route that does not exist', (done) => {
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
  });

  // Test the /PUT route
  describe('MODIFY entry', () => {
    it('should MODIFY an entry given the id', (done) => {
      const entry = {
        title: 'Met a band',
        details: 'Asked if i had seen clefs'
      };
      client.query('INSERT INTO entries(title, details, time_created, user_id) VALUES ( $1, $2, Now(), $3) RETURNING *', [entry.title, entry.details, userId], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          const data = response.rows[0];
          chai
            .request('localhost:3000/api/v1')
            .put(`/entries/${data.id}`)
            .send({ title: 'Met a wand', details: 'Asked if i had seen clefs', user_id: userId })
            .set('Authorization', token)
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

    it('should not MODIFY an entry when the entry does not exist.', (done) => {
      const entry = {
        title: 'Met a band',
        details: 'Asked if i had seen clefs'
      };
      client.query('INSERT INTO entries(title, details, time_created, user_id) VALUES ( $1, $2, Now(), $3) RETURNING *', [entry.title, entry.details, userId], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          chai
            .request('localhost:3000/api/v1')
            .put('/entries/10000')
            .send({ title: 'Met a wand', details: 'Asked if i had seen clefs' })
            .set('Authorization', token)
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
                  .eql('Sorry, Can\'t edit entry');
                done();
              }
            });
        }
      });
    });
  });

  // Test the /DELETE route
  describe('DELETE entry', () => {
    it('should DELETE an entry given the id', (done) => {
      const entry = {
        title: 'Met a band',
        details: 'Asked if i had seen clefs'
      };
      client.query('INSERT INTO entries(title, details, time_created, user_id) VALUES ( $1, $2, Now(), $3) RETURNING *', [entry.title, entry.details, userId], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          const data = response.rows[0];
          chai
            .request('localhost:3000/api/v1')
            .delete(`/entries/${data.id}`)
            .set('Authorization', token)
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

    it('should not DELETE an entry if the given id does not exist', (done) => {
      const entry = {
        title: 'Met a band',
        details: 'Asked if i had seen clefs'
      };
      client.query('INSERT INTO entries(title, details, time_created, user_id) VALUES ( $1, $2, Now(), $3) RETURNING *', [entry.title, entry.details, userId], (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          chai
            .request('localhost:3000/api/v1')
            .delete('/entries/989999')
            .set('Authorization', token)
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
                  .eql('This entry was not found');
                done();
              }
            });
        }
      });
    });
  });
});