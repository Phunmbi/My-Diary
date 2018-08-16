// This code was written based off this tutorials from Net Ninja and Devslopes
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9jBcybHMTIia56aV21o2cZ8
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp
import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import { validateSignUp, validateLogIn } from '../helpers/routeValidator';
import {
  viewAll,
  viewOne,
  addOne,
  deleteOne,
  modifyOne
} from '../controllers/entryController';
import {
  signup,
  login,
  addReminder,
  getReminder,
  welcome
} from '../controllers/userController';
import { authorization } from '../helpers/authorization';
import swaggerDoc from '../../swagger.json';

const router = Router();

// api routes v1 (/v1)

// API endpoints for users
router.get('/auth', welcome);
router.post('/auth/signup', validateSignUp, signup);
router.post('/auth/login', validateLogIn, login);

// API endpoints for reminders
router.post('./auth/reminder', authorization, addReminder);
router.get('/auth/reminder', authorization, getReminder);

// API endpoints for entries
router.get('/entries', authorization, viewAll);
router.get('/entries/:id', authorization, viewOne);
router.post('/entries', authorization, addOne);
router.put('/entries/:id', authorization, modifyOne);
router.delete('/entries/:id', authorization, deleteOne);

// API endpoint for Documentation
router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
export default router;