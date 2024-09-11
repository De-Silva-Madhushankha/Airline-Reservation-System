import mysql from 'mysql2' // Using mysql2 for promise support
import dotenv from 'dotenv'

dotenv.config()

// Database connection configuration
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

module.exports = pool.promise()















// Example usage
insertUser(2, 'johnsmith', 'securePass1', '123-456-7890', 'john.smith@example.com', 5);


const aircrafts = await getAircrafts()
console.log(aircrafts)

// const result = await registerUser('Bawantha', 'Madhushankha', '2002-10-26', 'root@gmail.com', 'Gold')
// console.log(result)


export default pool
