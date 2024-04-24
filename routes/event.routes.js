import express from 'express';
import {
  createEvent,
  deleteEvent,
  getEvents,
} from '../controller/event.js';
import { isLoggedIn } from '../middleware/authentication.js';
import { restrictTo } from '../middleware/authorization.js';

const router = express.Router();

router.get('/', getEvents);

// Protect the routes to be accessed by admin only
router.use(isLoggedIn, restrictTo('admin'));
router.post('/', createEvent);
router.route('/:id').delete(deleteEvent);

export default router;
