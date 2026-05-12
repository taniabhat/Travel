// src/models/user.model.js

import mongoose from 'mongoose';
import { hashPassword, comparePassword } from '../utils/password.js';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: ['user', 'admin', 'guide', 'vendor'],
            default: 'user',
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await hashPassword(this.password);

    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return comparePassword(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;