// This code was written based off this tutorials from Net Ninja and Devslopes
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9jBcybHMTIia56aV21o2cZ8
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp
import { Router } from 'express';
import { validateEntry, schemas } from '../helpers/routeValidator';
import {
  viewAll,
  viewOne,
  addOne,
  deleteOne,
  modifyOne,
} from '../controllers/entryController';
import { signup, welcome } from '../controllers/userController';

const router = Router();

// api routes v1 (/v1)

// API endpoints for entries

router.get('/entries', viewAll);
router.get('/entries/:id', viewOne);
router.post('/entries', validateEntry(schemas.entries), addOne);
router.put('/entries/:id', validateEntry(schemas.entries), modifyOne);
router.delete('/entries/:id', deleteOne);

// API endpoints for users
router.get('/auth', welcome);
router.post('/auth/signup', validateEntry(schemas.userSignUp), signup);

export default router;