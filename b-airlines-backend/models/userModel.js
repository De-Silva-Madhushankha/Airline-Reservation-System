import db from '../database/db.js';
import dotenv from 'dotenv';
dotenv.config();

const User = {
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM User');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getUserDiscount: async (user_id) => {
    const query = 'SELECT lp.discount FROM User u JOIN Loyalty_program lp ON u.program_id = lp.program_id WHERE u.user_id = ?';
    const [rows] = await db.execute(query, [user_id]);
    return rows.length > 0 ? rows[0].discount : null;
}, 

  create: async (title, first_name, last_name, email, password, date_of_birth, country, mobile_number ) => {
    try {
      const [result] = await db.query(
        `INSERT INTO User (user_id, title, first_name, last_name, email, password, date_of_birth, country, mobile_number) 
         VALUES (UUID(),?,?,?,?,?,?,?,?)`, 
         [title, first_name, last_name, email, password, date_of_birth, country, mobile_number]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateProfile: async ( first_name, last_name ,country, mobile_number,user_id) => {
    try {
      const [result] = await db.query(`UPDATE User 
          SET first_name = ?, last_name = ?, country = ?, mobile_number = ?
          WHERE user_id = ?`, [first_name, last_name, country, mobile_number, user_id]);
      
      console.log(result);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  delete: async (ID) => {
    try {
      const [result] = await db.query('DELETE FROM User WHERE user_id = ?', [ID]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM User WHERE email = ?', [email]);
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


