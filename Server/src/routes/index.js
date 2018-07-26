// This code was written based off this tutorials from Net Ninja and Devslopes
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9jBcybHMTIia56aV21o2cZ8
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp
import { Router } from 'express';
import {
  viewAll,
  viewOne,
  modifyOne,
  deleteOne,
  addOne,
  database
} from '../db';

const router = Router();

// api routes v1 (/v1)

// /entries api, get all entries
router.get('/entries', (req, res) => {
  viewAll((data) => {
    res.json({
      data,
      status: res.statusCode,
      message: 'Entire database'
    });
  });
});

// get specific entry
router.get('/entries/:id', (req, res) => {
  const reply = viewOne(req.params.id);
  res.json({
    data: reply,
    status: res.statusCode,
    message: 'Single Entry'
  });
});

// add an entry
router.post('/entries', (req, res) => {
  const result = addOne(req.body);
  res.json({
    data: result,
    status: res.statusCode,
    message: 'New entry added'
  });
});

// edit an entry
router.put('/entries/:id', (req, res) => {
  req.body.id = req.params.id;
  modifyOne(req.body);
  res.json({
    data: req.body,
    status: res.statusCode,
    message: 'Entry updated successfully'
  });
});

// delete an entry
router.delete('/entries/:id', (req, res) => {
  const entry = req.params.id;
  deleteOne(entry);
  res.json({
    data: database,
    status: res.statusCode,
    message: 'This entry has been removed'
  });
});

export default router;