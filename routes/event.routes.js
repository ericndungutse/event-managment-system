import express from 'express';
import {
  createEvent,
  getEvents,
} from '../controller/event.js';
import { isLoggedIn } from '../middleware/authentication.js';
import { restrictTo } from '../middleware/authorization.js';

const router = express.Router();

router.get('/', getEvents);
router.post(
  '/',
  isLoggedIn,
  restrictTo('admin'),
  createEvent
);

export default router;
