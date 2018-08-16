// This tutorial by codewokr off youtube helped build the webtoken
// https://www.youtube.com/watch?v=YxFZC8FtRao
// While this helped in explaining and implementing bcrypt
// https://www.youtube.com/watch?v=0D5EEKH97NA&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=12
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { client } from '../models/db';

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mydiaryan.no.reply@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

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
          res.status(400).json({
            status: res.statusCode,
            message: 'User was not added successfully, email already exists.'
          });
        } else {
          const data = {
            firstName: response.rows[0].first_name,
            lastName: response.rows[0].last_name
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
      res.status(500).json({
        status: res.statusCode,
        message: 'Error reaching database',
        err
      });
    } else if (response.rowCount > 0) {
      const data = {
        firstName: response.rows[0].first_name,
        lastName: response.rows[0].last_name
      };

      const tokenize = token(response.rows[0]);
      bcrypt.compare(req.body.password, response.rows[0].password, (error, result) => {
        if (result) {
          console.log(result);
          res.status(200).json({
            tokenize,
            data,
            status: res.statusCode,
            message: 'Authentic User'
          });
        } else {
          res.status(401).json({
            status: res.statusCode,
            message: 'Wrong Email or Password'
          });
        }
      });
    } else {
      res.status(404).json({
        status: res.statusCode,
        message: 'Wrong Email or Password'
      });
    }
  });
};

const addReminder = (req, res) => {
  client.query('INSERT INTO users(reminder) VALUES ($1) WHERE id = $2 RETURNING *', [req.body.time, req.userData.sub], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      const data = response.rows[0];

      // Get time
      const time = req.body.time.split(':');
      const hour = time[0];
      const minutes = time[1];

      // Schedule cron job
      cron.schedule(`* ${minutes} ${hour} * *`, () => {
        const mailOptions = {
          from: 'mydiaryan.no.reply@gmail.com',
          to: 'phunmbi@gmail.com',
          subject: 'Diary Reminder',
          text: 'Hey, How\'s the day going?, Why don\'t you tell your diary all about it.'
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            throw error;
          } else {
            res.status(201).json({
              data,
              message: 'Reminder successfully set',
              status: res.statusCode
            });
          }
        });
      });
    }
  });
};

const getReminder = (req, res) => {
  client.query('SELECT reminder FROM users WHERE id=$1', [req.userData.sub], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      const data = response.rows[0];
      res.status(200).json({
        data,
        message: 'Current reminder setting',
        status: res.statusCode
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

export {
  signup,
  login,
  addReminder,
  getReminder,
  welcome
};