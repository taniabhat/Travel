const Booking = require('../models/Booking');
const User = require('../models/User');
const Tour = require('../models/Tour');
const { sendBookingConfirmation } = require('../utils/emailService');

// @desc    Process Payment (Mock)
// @route   POST /api/payment/process
// @access  Private
const processPayment = async (req, res) => {
    const { amount, bookingId, paymentMethod } = req.body;

    if (!amount || !bookingId) {
        res.status(400);
        throw new Error('Missing payment details');
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock Success
    const success = true; // In a real gateway, this depends on the provider response

    if (success) {
        const paymentId = `PAY_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Update booking status
        const booking = await Booking.findById(bookingId);
        if (booking) {
            booking.paymentStatus = 'paid';
            booking.status = 'confirmed';
            booking.paymentId = paymentId;
            await booking.save();

            // Send confirmation email (non-blocking)
            try {
                const user = await User.findById(booking.user).select('name email');
                const tour = await Tour.findById(booking.tour);
                if (user && user.email) {
                    // Fire-and-forget — don't await
                    sendBookingConfirmation(user.email, user.name, booking, tour);
                }
            } catch (emailErr) {
                console.error('Email send error:', emailErr.message);
            }
        }

        res.status(200).json({
            success: true,
            paymentId,
            message: 'Payment processed successfully'
        });
    } else {
        res.status(400);
        throw new Error('Payment failed');
    }
};

module.exports = { processPayment };
