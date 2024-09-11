import bcrypt from 'bcrypt';
import pool from '../database/db';

// Function to hash the password using bcrypt
async function hashPassword(password) {
    // Generate a salt
    const saltRounds = 10; // Number of rounds for salting
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  
  // Function to insert a new user into the database
  async function insertUser(roleId, username, password, phoneNumber, email, loyaltyPoints) {
    try {
      // Hash the password
      const hashedPassword = await hashPassword(password);
  
      // Insert the user into the database
      const query = `
        INSERT INTO User (role_id, username, password, user_phone_number, user_email, loyalty_points)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await pool.execute(query, [
        roleId,
        username,
        hashedPassword,
        phoneNumber,
        email,
        loyaltyPoints,
      ]);
  
      // Close the connection
      await connection.end();
  
      console.log('User inserted successfully with ID:', result.insertId);
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  }