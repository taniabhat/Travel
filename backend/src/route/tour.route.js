// src/routes/tour.routes.js

import { Router } from 'express';

import {
    getTours,
    getTour,
    createTour,
} from '../controllers/tour.controller.js';

import {
    protect,
    authorize,
} from '../middlewares/auth.middleware.js';

const router = Router();

router
    .route('/')
    .get(getTours)
    .post(
        protect,
        authorize('admin'),
        createTour
    );

router
    .route('/:id')
    .get(getTour);

export default router;