import mongoose from 'mongoose';
import Booking from '../model/bookingModel.js';
import { bookingValidation } from '../validation/bookingValidation.js';
import Event from '../model/EventModel.js';
import APIFeatures from '../utils/APIFeatures.js';
import { mongoIdValidator } from '../validation/mongoidValidator.js';

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

// GET ALL Bokkings
export const getBookings = async (req, res) => {
  try {
    const query = {};
    // Users: Query only their bookings
    if (req.user.role === 'user') query.user = req.user._id;

    // Create Query
    let features = new APIFeatures(
      Booking.find(query),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const bookings = await features.query;

    res.status(200).json({
      results: bookings.length,
      bookings,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving bookings',
      error: err.message,
    });
  }
};

// GET Booking
export const getBooking = async (req, res) => {
  try {
    // 1) Validate event id
    const { error } = mongoIdValidator.validate(
      req.params,
      {
        errors: { label: 'key', wrap: { label: false } },
      }
    );

    if (error) {
      return res
        .status(400)
        .json({ message: error.message });
    }

    const bookingId = req.params.id;

    // Build Query based on role
    const query = {
      _id: bookingId,
    };

    if (req.user.role === 'user') query.user = req.user._id;

    // Find the event by ID
    const booking = await Booking.findOne(query)
      .populate({
        path: 'event',
        select: 'name date location',
      })
      .populate({
        path: 'user',
        select: 'email firstName lastName',
      });

    if (!booking) {
      return res
        .status(404)
        .json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (err) {
    console.error('Error fetching Booking:', err);
    res
      .status(500)
      .json({ message: 'Internal Server Error' });
  }
};
