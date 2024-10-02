import db from '../database/db.js';
import dotenv from 'dotenv';
dotenv.config();

const User = {
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM user');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (title, first_name, last_name, email, password, date_of_birth, country, mobile_number ) => {
    try {
      const [result] = await db.query(
        `INSERT INTO user (user_id, title, first_name, last_name, email, password, date_of_birth, country, mobile_number) 
         VALUES (UUID(),?,?,?,?,?,?,?,?)`, 
         [title, first_name, last_name, email, password, date_of_birth, country, mobile_number]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (user_id, username, password, user_phone_number, user_email, loyalty_points) => {
    try {
      const [result] = await db.query(`UPDATE user 
          SET username = ?, password = ?, user_phone_number = ?, user_email = ?, loyalty_points = ?
          WHERE user_id = ?`, [username, password, user_phone_number, user_email, loyalty_points, user_id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  delete: async (ID) => {
    try {
      const [result] = await db.query('DELETE FROM user WHERE user_id = ?', [ID]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM user_info WHERE user_id = ?', [id]);
    return rows;
  },

  getUserFlights: async (id) => {
    const [rows] = await db.query('SELECT * FROM user_bookings WHERE user_id = ?', [id]);
    return rows;
  },

  
};

export default User;


