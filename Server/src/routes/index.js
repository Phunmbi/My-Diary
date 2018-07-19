import { Router } from 'express';
import db from '../db';


const router = Router();

// api routes v1 (/v1)
// /entries api, get all entries
router.get('/entries', (req, res) => {
  res.json(db.viewAll());
});

// add an entry
router.post('/entries', (req, res) => {
  db.addOne(req.body);
  res.json({ message: 'New entry added' });
});

export default router;