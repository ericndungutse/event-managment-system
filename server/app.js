import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import authRouter from './routes/auth.routes.js';
import eventRouter from './routes/event.routes.js';
import bookingRounter from './routes/booking.routes.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Routing
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/bookings', bookingRounter);

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Root (${req.originalUrl}) does not exist.`,
  });
});

export default app;
