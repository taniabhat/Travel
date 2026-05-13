// src/services/auth.service.js

import User from '../models/user.model.js';
import MongoRepository from '../repositories/mongo.repository.js';

import { generateToken } from '../utils/jwt.js';

const userRepo = new MongoRepository(User);

const buildAuthResponse = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
    };
};

export const registerUser = async ({ name, email, password }) => {
    const existingUser = await userRepo.exists({ email });

    if (existingUser) {
        const error = new Error('User already exists');
        error.statusCode = 409;

        throw error;
    }

    const user = await userRepo.create({
        name,
        email,
        password,
    });

    return buildAuthResponse(user);
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email })
        .select('+password');

    if (!user) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;

        throw error;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;

        throw error;
    }

    return buildAuthResponse(user);
};

export const getUserById = async (id) => {
    const user = await userRepo.findById(id);

    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;

        throw error;
    }

    return user;
};