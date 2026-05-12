// src/services/payment.service.js

import { updateBookingPayment, getBookingById } from './booking.service.js';

import User from '../models/user.model.js';
import Tour from '../models/tour.model.js';

import MongoRepository from '../repositories/mongo.repository.js';

import { sendBookingConfirmation } from './email.service.js';

const userRepo = new MongoRepository(User);
const tourRepo = new MongoRepository(Tour);

export const processPayment = async ({ bookingId }) => {
    if (!bookingId) {
        const error = new Error('Booking ID is required');
        error.statusCode = 400;

        throw error;
    }

    const booking = await getBookingById(bookingId);

    if (!booking) {
        const error = new Error('Booking not found');
        error.statusCode = 404;

        throw error;
    }

    if (booking.paymentStatus === 'paid') {
        const error = new Error('Booking already paid');
        error.statusCode = 400;

        throw error;
    }

    const amount = booking.totalPrice;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const paymentId =
        `PAY_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    const updatedBooking = await updateBookingPayment(
        bookingId,
        {
            paymentStatus: 'paid',
            status: 'confirmed',
            paymentId,
        }
    );

    queueBookingConfirmationEmail(updatedBooking);

    return {
        success: true,
        paymentId,
        amount,
        message: 'Payment processed successfully',
    };
};

const queueBookingConfirmationEmail = async (booking) => {
    try {
        const user = await userRepo.findById(
            booking.user,
            {
                select: 'name email',
            }
        );

        const tour = await tourRepo.findById(booking.tour);

        if (!user?.email) {
            return;
        }

        await sendBookingConfirmation(
            user.email,
            user.name,
            booking,
            tour
        );
    } catch (error) {
        console.error(
            'Booking confirmation email failed:',
            error.message
        );
    }
};