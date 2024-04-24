import express from 'express';
import dotenv from 'dotenv';

// Routes
import authRouter from './routes/auth.routes.js';
import eventRouter from './routes/event.routes.js';

const app = express();
dotenv.config();

app.use(express.json());

// Routing
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/events', eventRouter);

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Root (${req.originalUrl}) does not exist.`,
  });
});

export default app;
