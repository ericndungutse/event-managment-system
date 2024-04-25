import mongoose from 'mongoose';
import Booking from '../model/bookingModel.js';
import { bookingValidation } from '../validation/bookingValidation.js';
import Event from '../model/EventModel.js';

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    // Validate Body
    const { error } = bookingValidation.validate(req.body, {
      errors: { label: 'key', wrap: { label: false } },
    });

    if (error) {
      return res
        .status(400)
        .json({ status: 'fail', message: error.message });
    }

    // Check if event exists and has available spots
    const event = await Event.findOne({
      _id: req.body.event,
      availableTickets: { $gte: req.body.nummberOfTickets },
    });

    if (!event) {
      return res.status(404).json({
        message: 'Not tickets available.',
      });
    }

    // TODO: ACTIVATE USE OF TRANSACTION ON CLOUD DATABASE
    // const session = await mongoose.startSession();
    // let booking;

    // await session.withTransaction(async () => {
    //   // Create Booking
    //   booking = await Booking.create(
    //     [{ ...req.body, user: req.user._id }],
    //     { session }
    //   );

    //   // Update Event availability
    //   event.availableTickets -= req.body.nummberOfTickets;
    //   await event.save({
    //     validateBeforeSave: false,
    //   });
    // });

    // await session.endSession();

    // Create Booking
    const booking = await Booking.create({
      ...req.body,
      user: req.user._id,
    });

    // Update Event availability
    event.availableTickets -= req.body.nummberOfTickets;
    await event.save({
      validateBeforeSave: false,
    });

    res.status(201).json({
      message: 'Booking created successfully!',
      booking,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 'error',
      message: 'Internal server error.',
    });
  }
};
