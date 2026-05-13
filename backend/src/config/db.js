// src/config/db.js

import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.connection.close();

        console.log('MongoDB disconnected');
    } catch (error) {
        console.error(`MongoDB Disconnect Error: ${error.message}`);
    }
};