import { client } from '../models/db';

const viewAll = (req, res) => {
  client.query('SELECT * FROM entries', (err, response) => {
    if (err) {
      console.log(err.stack);
    } else {
      const data = response.rows;
      if (response.rowCount > 0) {
        res.status(200).json({
          data,
          status: res.statusCode,
          message: 'All records displayed'
        });
      } else {
        res.status(200).json({
          data,
          status: res.statusCode,
          message: 'Empty Entries'
        });
      }
    }
  });
};

const viewOne = (req, res) => {
  client.query(
    `SELECT * FROM entries WHERE entryid=${req.params.id}`,
    (err, response) => {
      const data = response.rows[0];
      if (response.rowCount > 0) {
        res.status(200).json({
          data,
          status: res.statusCode,
          message: 'Single entry displayed'
        });
      } else {
        res.status(404).json({
          status: res.statusCode,
          message: 'Entry does not exist'
        });
      }
    }
  );
};

const addOne = (req, res) => {
  client.query(
    'INSERT INTO entries(email, title, details, last_time_edited, userid) VALUES ( $1, $2, $3, Now(), (SELECT userid FROM users WHERE email = $4)) RETURNING *',
    [req.body.email, req.body.title, req.body.details, req.body.email],
    (err, response) => {
      if (err) {
        console.log(err.stack);
        res.status(404).json({
          status: res.statusCode,
          message: 'This User can\'t add an entry'
        });
      } else {
        const data = response.rows[0];
        res.status(200).json({
          data,
          status: res.statusCode,
          message: 'A new entry has been added'
        });
      }
    }
  );
};

const modifyOne = (req, res) => {
  client.query(
    'UPDATE entries SET title = $1, details = $2 WHERE entryid = $3 RETURNING *',
    [req.body.title, req.body.details, req.params.id],
    (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        const data = response.rows;
        if (response.rowCount > 0) {
          res.status(200).json({
            data,
            status: res.statusCode,
            message: 'This entry has been successfully edited'
          });
        } else {
          res.status(404).json({
            status: res.statusCode,
            message: 'This entry was not modified successfully.'
          });
        }
      }
    }
  );
};

const deleteOne = (req, res) => {
  client.query(
    'DELETE FROM entries WHERE entryid = $1 RETURNING *',
    [req.params.id],
    (err, response) => {
      if (err) {
        console.log(err.stack);
      } else if (response.rowCount > 0) {
        res.status(200).json({
          status: res.statusCode,
          message: 'The entry was successfully deleted'
        });
      } else {
        res.status(404).json({
          status: res.statusCode,
          message: 'This entry was not deleted successfully'
        });
      }
    }
  );
};

export {
  viewAll,
  viewOne,
  addOne,
  deleteOne,
  modifyOne
};
