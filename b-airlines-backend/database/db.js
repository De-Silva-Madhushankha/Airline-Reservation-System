import mysql from 'mysql2'; // Using mysql2 with promise support
import dotenv from 'dotenv';

dotenv.config();

// Database connection configuration
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT, 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

const db = pool;
console.log("Database connected");
export default db;