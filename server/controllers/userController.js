import { client } from '../models/db';
import { createUsersTable } from '../models/schema';

const signup = (req, res) => {
  client.query(
    'INSERT INTO users(firstName, lastName, email, password) VALUES ( $1, $2, $3, $4) RETURNING *',
    [
      req.value.body.firstName,
      req.value.body.lastName,
      req.value.body.email,
      req.value.body.password
    ],
    (err, response) => {
      if (err) {
        console.log(err.stack);
        res.status(404).json({
          status: res.statusCode,
          message: 'User was not added successfully'
        });
      } else {
        const data = response.rows[0];
        res.status(200).json({
          data,
          status: res.statusCode,
          message: 'A new user has been created'
        });
      }
    }
  );
};

const signin = (req, res) => {
  client.query(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [req.value.body.email, req.value.body.password],
    (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        const data = response.rows[0];
        if (response.rowCount > 0) {
          res.status(200).json({
            data,
            status: res.statusCode,
            message: 'Here are the entries for this user'
          });
        } else {
          res.status(404).json({
            status: res.statusCode,
            message: 'Wrong Email or Password, Try again.'
          });
        }
      }
    }
  );
};

const welcome = (req, res) => {
  res.status(200).json({
    status: res.statusCode,
    message: 'Welcome to the user authentication APIs'
  });
};

export { signup, signin, welcome };