import db from '../database/db.js';
import dotenv from 'dotenv';
dotenv.config();

const User = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`CALL GetAllUsers()`);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (title, first_name, last_name, email, password, date_of_birth, country, mobile_number ) => {
    try {
      const [result] = await db.query(`CALL InsertUser(?, ?, ?, ?, ?, ?, ?, ?)`, 
        [title, first_name, last_name, email, password, date_of_birth, country, mobile_number]);
      
      return result.insertId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateProfile: async ( first_name, last_name ,country, mobile_number,user_id) => {
    try {
      const [result] = await db.query(`CALL UpdateUserDetails(?, ?, ?, ?, ?)`, [user_id, first_name, last_name, country, mobile_number]);

      console.log(result);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  delete: async (ID) => {
    try {
      const [result] = await db.query(`CALL DeleteUserById(?)`, [ID]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  findByEmail: async (email) => {
    const [rows] = await db.query(`CALL GetUserByEmail(?)`, [email]);

    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query(`CALL GetUserInfoById(?)`, [id]);
    return rows;
  },

  getUserFlights: async (id) => {
    const [rows] = await db.query(`CALL GetUserBookingsById(?)`, [id]);
    return rows;
  },

  
};

export default User;


