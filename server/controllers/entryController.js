import { client } from '../models/db';

const viewAll = (req, res) => {
  client.query('SELECT * FROM entries WHERE user_id = $1', [req.userData.sub], (err, response) => {
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
        res.status(204).json({
          status: res.statusCode
        });
      }
    }
  });
};

const viewOne = (req, res) => {
  client.query(
    `SELECT * FROM entries WHERE id=${req.params.id}`,
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
    'INSERT INTO entries(title, details, time_created, user_id) VALUES ( $1, $2, Now(), $3) RETURNING *',
    [req.body.title, req.body.details, req.userData.sub],
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
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  let oldDay;
  let oldMonth;
  let oldYear;
  client.query('SELECT EXTRACT (day FROM time_created) as day, EXTRACT (month FROM time_created) as month, EXTRACT (isoyear FROM time_created) as year FROM entries WHERE id = $1', [req.params.id], (err, resp) => {
    if (err) {
      console.log(err.stack);
    } else {
      if (resp.rowCount > 0) {
        oldDay = resp.rows[0].day;
        oldMonth = resp.rows[0].month;
        oldYear = resp.rows[0].year;
        const dayDiff = currentDay - oldDay;
        const monthDiff = currentMonth - oldMonth;
        const yearDiff = currentYear - oldYear;
        if (dayDiff === 0 && monthDiff === 0 && yearDiff === 0) {
          client.query(
            'UPDATE entries SET title = $1, details = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [req.body.title, req.body.details, req.params.id, req.userData.sub],
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
                    message: 'This entry does not exist'
                  });
                }
              }
            }
          );
        } else {
          res.status(403).json({
            status: res.statusCode,
            message: 'Sorry, You can\'t edit an entry after the day it was created'
          });
        }
      } else {
        res.status(404).json({
          status: res.statusCode,
          message: 'This entry doesn\'t exist'
        });
      }
    }
  });
};

const deleteOne = (req, res) => {
  client.query(
    'DELETE FROM entries WHERE id = $1 AND user_id = $2 RETURNING *',
    [req.params.id, req.userData.sub],
    (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        if (response.rowCount > 0) {
          res.status(200).json({
            status: res.statusCode,
            message: 'The entry was successfully deleted'
          });
        } else {
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