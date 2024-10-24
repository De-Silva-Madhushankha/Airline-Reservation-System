import dotenv from 'dotenv';
import mysql from 'mysql2'; // Using mysql2 for promise support

dotenv.config()


// Database connection configuration
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// connect db
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connected");
    }
})

//const [raw]= await db.query("SELECT* FROM flight")
// Test the connection

//console.log(raw);

export default db;


