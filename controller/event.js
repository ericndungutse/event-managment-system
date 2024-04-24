import Event from '../model/EventModel.js';

export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();

    res.status(201).json({
      status: 'success',
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

export const getEvents = async (req, res) => {
  try {
    // TODO: Where date is > today
    const events = await Event.find();

    res.status(200).json({
      status: 'success',
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
