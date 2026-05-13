// src/services/booking.service.js

import Booking from '../models/booking.model.js';
import Tour from '../models/tour.model.js';

import MongoRepository from '../repositories/mongo.repository.js';

const bookingRepo = new MongoRepository(Booking);

export const createBooking = async ({
    userId,
    tourId,
    travelDate,
    guests,
}) => {
    const tour = await Tour.findById(tourId);

    if (!tour) {
        const error = new Error('Tour not found');
        error.statusCode = 404;

        throw error;
    }

    const totalPrice = tour.price * guests;

    const booking = await bookingRepo.create({
        user: userId,
        tour: tourId,
        travelDate,
        guests,
        totalPrice,
        status: 'pending',
        paymentStatus: 'unpaid',
    });

    return booking;
};

export const getBookingsByUser = async (userId) => {
    return await bookingRepo.findAll(
        { user: userId },
        {
            populate: {
                path: 'tour',
            },
            sort: { createdAt: -1 },
        }
    );
};

export const getBookingById = async (id) => {
    const booking = await bookingRepo.findById(id, {
        populate: [
            {
                path: 'user',
                select: 'name email',
            },
            {
                path: 'tour',
            },
        ],
    });

    if (!booking) {
        const error = new Error('Booking not found');
        error.statusCode = 404;

        throw error;
    }

    return booking;
};

export const updateBookingPayment = async (
    bookingId,
    {
        paymentStatus,
        status,
        paymentId,
    }
) => {
    const booking = await bookingRepo.updateById(
        bookingId,
        {
            paymentStatus,
            status,
            paymentId,
        }
    );

    if (!booking) {
        const error = new Error('Booking not found');
        error.statusCode = 404;

        throw error;
    }

    return booking;
};