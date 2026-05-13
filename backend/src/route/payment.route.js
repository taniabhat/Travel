// src/routes/payment.routes.js

import { Router } from 'express';

import {
    processPayment,
} from '../controllers/payment.controller.js';

import {
    protect,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.post(
    '/',
    protect,
    processPayment
);

export default router;