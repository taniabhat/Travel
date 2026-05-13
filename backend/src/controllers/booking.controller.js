// src/controllers/booking.controller.js

import * as bookingService from '../services/booking.service.js';

import { asyncHandler } from '../utils/asyncHandler.js';

import { AppError } from '../utils/errors.js';

export const createBooking = asyncHandler(async (req, res) => {
    const {
        tourId,
        travelDate,
        guests,
    } = req.body;

    if (!tourId || !travelDate || !guests) {
        throw new AppError(
            'Please provide all booking details',
            400
        );
    }

    const booking = await bookingService.createBooking({
        userId: req.user._id,
        tourId,
        travelDate,
        guests,
    });

    res.status(201).json({
        success: true,
        data: booking,
    });
});

export const getMyBookings = asyncHandler(async (req, res) => {
    const bookings =
        await bookingService.getBookingsByUser(
            req.user._id
        );

    res.status(200).json({
        success: true,
        data: bookings,
    });
});

export const getBookingById = asyncHandler(async (req, res) => {
    const booking =
        await bookingService.getBookingById(
            req.params.id
        );

    // Ownership check
    if (
        booking.user._id.toString() !==
            req.user._id.toString() &&
        req.user.role !== 'admin'
    ) {
        throw new AppError(
            'Not authorized to access this booking',
            403
        );
    }

    res.status(200).json({
        success: true,
        data: booking,
    });
});