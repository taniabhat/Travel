// src/middlewares/error.middleware.js

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;

    let message = err.message || 'Internal Server Error';

    // Mongoose invalid ObjectId
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid resource ID';
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        statusCode = 409;

        const field = Object.keys(err.keyValue)[0];

        message = `${field} already exists`;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;

        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(', ');
    }

    // JWT invalid
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    // JWT expired
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Log server errors
    if (statusCode >= 500) {
        console.error(err);
    }

    res.status(statusCode).json({
        success: false,
        message,

        ...(process.env.NODE_ENV !== 'production' && {
            stack: err.stack,
        }),
    });
};