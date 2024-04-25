import express from 'express';

import { isLoggedIn } from '../middleware/authentication.js';
import {
  createBooking,
  getBooking,
  getBookings,
} from '../controller/Booking.js';

const router = express.Router();

router.use(isLoggedIn);
router.route('/').post(createBooking).get(getBookings);
router.route('/:id').get(getBooking);

// router.get('/:id', getEvent);
// router.post('/', createEvent);

export default router;
