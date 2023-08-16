import "dotenv/config";

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    GIT_ID: process.env.GIT_ID,
    GIT_SECRET: process.env.GIT_SECRET,
    GIT_URL: process.env.GIT_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    NODE_ENV: process.env.NODE_ENV
}