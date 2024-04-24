import Event from '../model/EventModel.js';
import { mongoIdValidator } from '../validation/mongoidValidator.js';

// CREATE AND EVENT
export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();

    res.status(201).json({
      message: 'Event created successfully!',
      event: newEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 'error',
      message: 'Error creating event',
    });
  }
};

// GET ALL EVENTS
export const getEvents = async (req, res) => {
  try {
    // TODO: Where date is > today
    const events = await Event.find();

    res.status(200).json({
      results: events.length,
      events,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving events',
      error: err.message,
    });
  }
};

// GET EVENT BY ID
export const getEvent = async (req, res) => {
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

    const eventId = req.params.id;

    // Find the event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res
        .status(404)
        .json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (err) {
    console.error('Error fetching event:', err);
    res
      .status(500)
      .json({ message: 'Internal Server Error' });
  }
};

// UPDATE EVENT BY ID BY ADMIN
export const updateEvent = async (req, res) => {
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

    const eventId = req.params.id;

    // Update Event
    const event = await Event.findByIdAndUpdate(
      eventId,
      req.body
    );

    if (!event) {
      return res
        .status(404)
        .json({ message: 'Event not found' });
    }

    res
      .status(200)
      .json({ message: 'Event updated successfully ' });
  } catch (err) {
    console.error('Error updating event:', err);
    res
      .status(500)
      .json({ message: 'Internal Server Error' });
  }
};

// DELETE AN EVENT BY ADMIN
export const deleteEvent = async (req, res) => {
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

    const eventId = req.params.id;

    // Delete Event
    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res
        .status(404)
        .json({ message: 'Event not found' });
    }

    res
      .status(200)
      .json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal Server Error' });
  }
};
