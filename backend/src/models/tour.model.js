// src/models/tour.model.js

import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },

        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: 20,
        },

        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },

        duration: {
            type: Number,
            required: [true, 'Duration is required'],
            min: 1,
        },

        rating: {
            type: Number,
            default: 4.5,
            min: 0,
            max: 5,
        },

        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['City', 'Nature', 'Culture', 'Relaxation', 'Adventure'],
        },

        image: {
            type: String,
            required: [true, 'Image URL is required'],
        },

        popular: {
            type: Boolean,
            default: false,
        },

        route: {
            type: [String],
            required: true,
            validate: {
                validator: (value) => value.length > 0,
                message: 'Route must contain at least one destination',
            },
        },

        accommodation: {
            type: String,
            trim: true,
        },

        transport: {
            type: String,
            trim: true,
        },

        meals: {
            type: String,
            trim: true,
        },

        groupSize: {
            type: Number,
            min: 1,
        },

        operator: {
            type: String,
            trim: true,
        },

        highlights: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

tourSchema.index({ category: 1 });
tourSchema.index({ price: 1 });
tourSchema.index({ rating: -1 });
tourSchema.index({ popular: 1 });

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;