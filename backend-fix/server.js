// server.js

import 'dotenv/config';
import './src/config/env.js';

import app from './src/app.js';
import { connectDB, disconnectDB } from './src/config/db.js';

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
    try {
        await connectDB();

        server = app.listen(PORT, () => {
            console.log(
                `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
            );
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

await startServer();

const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);

    try {
        server.close(async () => {
            console.log('HTTP server closed');

            await disconnectDB();

            console.log('Database connection closed');
            process.exit(0);
        });

        setTimeout(() => {
            console.error('Forcefully shutting down...');
            process.exit(1);
        }, 10000);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);

    gracefulShutdown('unhandledRejection');
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);

    gracefulShutdown('uncaughtException');
});