import { client } from '../models/db';

const viewAll = (req, res) => {
  client.query('SELECT * FROM entries WHERE user_id = $1', [req.userData.sub], (err, response) => {
    if (err) {
      res.status(500).json({
        status: res.statusCode,
        message: 'Error reaching database',
        err
      });
    } else {
      const data = response.rows;
      res.status(200).json({
        data,
        status: res.statusCode,
        message: 'Existing records displayed'
      });
    }
  });
};

const viewOne = (req, res) => {
  client.query(
    `SELECT * FROM entries WHERE id=${req.params.id}`,
    (err, response) => {
      if (err) {
        res.status(500).json({
          status: res.statusCode,
          message: 'Error reaching database',
          err
        });
      } else if (response.rowCount > 0) {
        const data = response.rows[0];
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
    'INSERT INTO entries(title, details, time_created, user_id) VALUES ( $1, $2, Now(), $3) RETURNING *',
    [req.body.title, req.body.details, req.userData.sub],
    (err, response) => {
      if (err) {
        res.status(404).json({
          status: res.statusCode,
          message: 'This User can\'t add an entry'
        });
      } else {
        const data = response.rows[0];
        res.status(201).json({
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
    'UPDATE entries SET title = $1, details = $2 WHERE id = $3 AND user_id = $4 AND (age(now(), time_created) < interval \'1 DAY\') RETURNING *',
    [req.body.title, req.body.details, req.params.id, req.userData.sub],
    (err, response) => {
      if (err) {
        res.status(500).json({
          status: res.statusCode,
          message: 'Error reaching database',
          err
        });
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
            data,
            status: res.statusCode,
            message: 'Sorry, Can\'t edit entry.'
          });
        }
      }
    }
  );
};

const deleteOne = (req, res) => {
  client.query(
    'DELETE FROM entries WHERE id = $1 AND user_id = $2 RETURNING *',
    [req.params.id, req.userData.sub],
    (err, response) => {
      if (err) {
        res.status(500).json({
          status: res.statusCode,
          message: 'Error reaching database',
          err
        });
      } else {
        if (response.rowCount > 0) {
          res.status(200).json({
            status: res.statusCode,
            message: 'The entry was successfully deleted'
          });
        } else if (response.rowCount === 0) {
          res.status(404).json({
            status: res.statusCode,
            message: 'This entry was not found'
          });
        }
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