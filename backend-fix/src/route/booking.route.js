// src/routes/booking.routes.js

import { Router } from 'express';

import {
    createBooking,
    getMyBookings,
    getBookingById,
} from '../controllers/booking.controller.js';

import {
    protect,
} from '../middlewares/auth.middleware.js';

const router = Router();

router
    .route('/')
    .post(
        protect,
        createBooking
    );

router
    .route('/my-bookings')
    .get(
        protect,
        getMyBookings
    );

router
    .route('/:id')
    .get(
        protect,
        getBookingById
    );

export default router;