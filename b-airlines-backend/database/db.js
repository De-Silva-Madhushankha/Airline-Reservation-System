import mysql from 'mysql2' // Using mysql2 for promise support
import dotenv from 'dotenv'

dotenv.config()


// Database connection configuration
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

const db = pool

// Test the connection
console.log("Database connected");

export default db;


