const Tour = require('../models/Tour');

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
const getTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
const getTour = async (req, res) => {
    try {
        const tour = await Tour.findOne({ id: req.params.id }); // Using custom ID from frontend data
        if (!tour) {
            // Try finding by MongoDB _id if custom id fails
            const tourById = await Tour.findById(req.params.id);
            if (!tourById) {
                res.status(404);
                throw new Error('Tour not found');
            }
            return res.status(200).json(tourById);
        }
        res.status(200).json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a tour
// @route   POST /api/tours
// @access  Private/Admin
const createTour = async (req, res) => {
    try {
        const tour = await Tour.create(req.body);
        res.status(201).json(tour);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getTours,
    getTour,
    createTour,
};
