import { Router } from 'express';
import db from '../db';


const router = Router();

// api routes v1 (/v1)
// /entries api, get all entries
router.get('/entries', (req, res) => {
  res.json(db.viewAll());
});

// get specific entry
router.get('/entries/:id', (req, res) => {
  const reply = db.viewOne(req.params.id);
  res.json(reply);
});

// add an entry
router.post('/entries', (req, res) => {
  db.addOne(req.body);
  res.json({ message: 'New entry added' });
});

// edit an entry
router.put('/entries/:id', (req, res) => {
  req.body.id = req.params.id;
  db.modifyOne(req.body);
  res.json({ message: 'Entry updated successfully' });
});

export default router;