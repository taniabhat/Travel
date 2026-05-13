// src/middlewares/auth.middleware.js

import { verifyToken } from '../utils/jwt.js';

import User from '../models/user.model.js';

import MongoRepository from '../repositories/mongo.repository.js';

const userRepo = new MongoRepository(User);

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith('Bearer ')
        ) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized',
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = verifyToken(token);

        const user = await userRepo.findById(
            decoded.userId
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User no longer exists',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated',
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden',
            });
        }

        next();
    };
};