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
  modifyOne
} from '../controllers/entryController';

const router = Router();

// api routes v1 (/v1)

router.get('/entries', viewAll);
router.get('/entries/:id', viewOne);
router.post('/entries', validateEntry(schemas), addOne);
router.put('/entries/:id', validateEntry(schemas), modifyOne);
router.delete('/entries/:id', deleteOne);

export default router;