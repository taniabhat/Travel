// src/app.js

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

import authRoute from './route/auth.route.js';
import tourRoute from './route/tour.route.js';
import bookingRoute from './route/booking.route.js';
import paymentRoute from './route/payment.route.js';

import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.disable('x-powered-by');

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(helmet());

app.use(compression());

app.use(express.json({ limit: '10kb' }));

app.use(
    express.urlencoded({
        extended: true,
        limit: '10kb',
    })
);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
    });
});

app.use('/api/auth', authRoute);
app.use('/api/tours', tourRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/payment', paymentRoute);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

app.use(errorHandler);

export default app;