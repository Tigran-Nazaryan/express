import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: "postgres",
};

export default dbConfig;