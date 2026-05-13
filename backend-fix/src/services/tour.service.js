// src/services/tour.service.js

import Tour from '../models/tour.model.js';
import MongoRepository from '../repositories/mongo.repository.js';

const tourRepo = new MongoRepository(Tour);



export const getTourById = async (id) => {
    const tour = await tourRepo.findById(id);

    if (!tour) {
        const error = new Error('Tour not found');
        error.statusCode = 404;

        throw error;
    }

    return tour;
};

export const createTour = async (data) => {
    return await tourRepo.create(data);
};

export const getAllTours = async ({
    category,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
}) => {
    const filter = {};

    if (category) {
        filter.category = category;
    }

    if (minPrice || maxPrice) {
        filter.price = {};

        if (minPrice) {
            filter.price.$gte = minPrice;
        }

        if (maxPrice) {
            filter.price.$lte = maxPrice;
        }
    }

    const skip = (page - 1) * limit;

    return await tourRepo.findAll(filter, {
        sort: { createdAt: -1 },
        limit,
        skip,
    });
};