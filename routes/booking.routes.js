import express from 'express';

import { isLoggedIn } from '../middleware/authentication.js';
import { createBooking } from '../controller/Booking.js';

const router = express.Router();

router.use(isLoggedIn);
router.route('/').post(createBooking);

// router.get('/:id', getEvent);
// router.post('/', createEvent);
// router.route('/:id').put(updateEvent).delete(deleteEvent);

export default router;
