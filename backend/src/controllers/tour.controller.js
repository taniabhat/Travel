// src/controllers/tour.controller.js

import * as tourService from '../services/tour.service.js';

import { asyncHandler } from '../utils/asyncHandler.js';

export const getTours = asyncHandler(async (req, res) => {
    const tours = await tourService.getAllTours({
        category: req.query.category,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
    });

    res.status(200).json({
        success: true,
        data: tours,
    });
});

export const getTour = asyncHandler(async (req, res) => {
    const tour = await tourService.getTourById(
        req.params.id
    );

    res.status(200).json({
        success: true,
        data: tour,
    });
});

export const createTour = asyncHandler(async (req, res) => {
    const tour = await tourService.createTour(
        req.body
    );

    res.status(201).json({
        success: true,
        data: tour,
    });
});