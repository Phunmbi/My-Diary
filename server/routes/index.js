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
import { signup, login, welcome } from '../controllers/userController';
import { authorization } from '../helpers/authorization';

const router = Router();

// api routes v1 (/v1)

// API endpoints for users
router.get('/auth', welcome);
router.post('/auth/signup', validateEntry(schemas.userSignUp), signup);
router.post('/auth/login', validateEntry(schemas.userLogIn), login);

// API endpoints for entries
router.get('/entries', authorization, viewAll);
router.get('/entries/:id', authorization, viewOne);
router.post('/entries', validateEntry(schemas.entries), authorization, addOne);
router.put('/entries/:id', validateEntry(schemas.entries), authorization, modifyOne);
router.delete('/entries/:id', authorization, deleteOne);

export default router;