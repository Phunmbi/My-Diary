// This tutorial by codewokr off youtube helped build the webtoken
// https://www.youtube.com/watch?v=YxFZC8FtRao
// While this helped in explaining and implementing bcrypt
// https://www.youtube.com/watch?v=0D5EEKH97NA&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=12
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { client } from '../models/db';


const token = (newUser) => {
  return JWT.sign({
    iss: 'MyDiaryAPI', sub: newUser.id, iat: new Date().getTime(), exp: new Date().getTime() + 3600000
  }, process.env.SECRET_KEY);
};

const signup = (req, res) => {
  // Add new user
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    client.query(
      'INSERT INTO users(first_Name, last_Name, email, password) VALUES ( $1, $2, $3, $4) RETURNING *',
      [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        hash
      ],
      (err, response) => {
        if (err) {
          console.log(err.stack);
          const error = err;
          res.status(400).json({
            status: res.statusCode,
            message: 'User was not added successfully, email already exists.'
          });
        } else {
          const data = {
            userid: response.rows[0].id,
            firstName: response.rows[0].first_name,
            lastName: response.rows[0].last_name,
            email: response.rows[0].email
          };
          res.status(201).json({
            token: token(response.rows[0]),
            data,
            status: res.statusCode,
            message: 'A new user has been created'
          });
        }
      }
    );
  });
};

const login = (req, res) => {
  client.query('SELECT * FROM users WHERE email = $1', [req.body.email], (err, response) => {
    if (err) {
      console.log(err.stack);
    }
    if (response.rowCount > 0) {
      const data = {
        userid: response.rows[0].id,
        firstName: response.rows[0].first_name,
        lastName: response.rows[0].last_name,
        email: response.rows[0].email
      };

      const tokenize = token(response.rows[0]);
      bcrypt.compare(req.body.password, response.rows[0].password, (error, result) => {
        if (result) {
          res.status(200).json({
            tokenize,
            data,
            status: res.statusCode,
            message: 'Authentic User'
          });
        } else {
          res.status(401).json({
            status: res.statusCode,
            message: 'Authorization failed'
          });
        }
      });
    } else {
      res.status(404).json({
        status: res.statusCode,
        message: 'Can\'t find user'
      });
    }
  });
};

const welcome = (req, res) => {
  res.status(200).json({
    status: res.statusCode,
    message: 'Welcome to the user authentication APIs'
  });
};

export { signup, login, welcome };