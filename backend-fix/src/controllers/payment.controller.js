// src/controllers/payment.controller.js

import * as paymentService from '../services/payment.service.js';

import { asyncHandler } from '../utils/asyncHandler.js';

import { AppError } from '../utils/errors.js';

export const processPayment = asyncHandler(async (req, res) => {
    const { bookingId } = req.body;

    if (!bookingId) {
        throw new AppError(
            'Booking ID is required',
            400
        );
    }

    const result =
        await paymentService.processPayment({
            bookingId,
        });

    res.status(200).json({
        success: true,
        data: result,
    });
});