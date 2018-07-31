import { client } from '../models/db';
import { createUsersTable } from '../models/schema';

createUsersTable();
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

const welcome = (req, res) => {
  res.status(200).json({
    status: res.statusCode,
    message: 'Welcome to the user authentication APIs'
  });
};

export { signup, welcome };
