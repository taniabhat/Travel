// src/config/env.js

const requiredEnvVars = [
    'NODE_ENV',
    'PORT',
    'MONGO_URI',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
    'BCRYPT_SALT_ROUNDS',
    'BREVO_API_KEY',
    'FROM_EMAIL',
    'FROM_NAME',
    'CLIENT_URL',
];

const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
    console.error(
        `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );

    process.exit(1);
}

console.log('Environment variables validated');