const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    id: { // Keeping the frontend ID for easier mapping initially, though _id is preferred
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Please add a tour title'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    duration: {
        type: Number,
        required: [true, 'Please add duration in days']
    },
    rating: {
        type: Number,
        default: 4.5
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['City', 'Nature', 'Culture', 'Relaxation', 'Adventure']
    },
    image: {
        type: String,
        required: [true, 'Please add an image URL']
    },
    popular: {
        type: Boolean,
        default: false
    },
    route: {
        type: [String],
        required: true
    },
    accommodation: String,
    transport: String,
    meals: String,
    groupSize: String,
    operator: String,
    highlights: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tour', tourSchema);
