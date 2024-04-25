import express from 'express';

import { isLoggedIn } from '../middleware/authentication.js';
import {
  cancelBooking,
  createBooking,
  getBooking,
  getBookings,
} from '../controller/Booking.js';

const router = express.Router();

router.use(isLoggedIn);
router.route('/').post(createBooking).get(getBookings);
router.route('/:id').get(getBooking);
router.patch('/:id/cancel-booking', cancelBooking);

export default router;
