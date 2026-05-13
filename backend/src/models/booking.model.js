// src/models/booking.model.js

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tour',
            required: true,
            index: true,
        },

        travelDate: {
            type: Date,
            required: [true, 'Travel date is required'],
        },

        guests: {
            type: Number,
            required: [true, 'Number of guests is required'],
            min: 1,
        },

        totalPrice: {
            type: Number,
            required: [true, 'Total price is required'],
            min: 0,
        },

        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'pending',
        },

        paymentStatus: {
            type: String,
            enum: ['unpaid', 'paid', 'refunded'],
            default: 'unpaid',
        },

        paymentId: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

bookingSchema.index({ user: 1, createdAt: -1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;