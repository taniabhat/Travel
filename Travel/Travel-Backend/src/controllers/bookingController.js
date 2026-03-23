const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    const {
        tourId,
        travelDate,
        guests,
        totalPrice
    } = req.body;

    if (!tourId || !travelDate || !guests || !totalPrice) {
        res.status(400);
        throw new Error('Please add all booking fields');
    }

    const booking = await Booking.create({
        user: req.user.id,
        tour: tourId,
        travelDate,
        guests,
        totalPrice,
        status: 'pending',
        paymentStatus: 'unpaid'
    });

    res.status(201).json(booking);
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id }).populate('tour');
    res.status(200).json(bookings);
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email').populate('tour');

    if (booking) {
        res.json(booking);
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    getBookingById
};
