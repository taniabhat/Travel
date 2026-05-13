// src/controllers/auth.controller.js

import * as authService from '../services/auth.service.js';

import { asyncHandler } from '../utils/asyncHandler.js';

import { AppError } from '../utils/errors.js';

export const register = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
    } = req.body;

    if (!name || !email || !password) {
        throw new AppError(
            'Please provide all required fields',
            400
        );
    }

    const data = await authService.registerUser({
        name,
        email,
        password,
    });

    res.status(201).json({
        success: true,
        data,
    });
});

export const login = asyncHandler(async (req, res) => {
    const {
        email,
        password,
    } = req.body;

    if (!email || !password) {
        throw new AppError(
            'Email and password are required',
            400
        );
    }

    const data = await authService.loginUser({
        email,
        password,
    });

    res.status(200).json({
        success: true,
        data,
    });
});

export const getMe = asyncHandler(async (req, res) => {
    const user = await authService.getUserById(
        req.user._id
    );

    res.status(200).json({
        success: true,
        data: user,
    });
});