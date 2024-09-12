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

  create: async (username, password, user_phone_number, user_email) => {
    try {
      const [result] = await db.query(
        `INSERT INTO user (role_id, username, password, user_phone_number, user_email, loyalty_points) 
         VALUES (?,?,?,?,?,?)`,
        [2,username, password, user_phone_number, user_email, 0]
      );
      return result.user_id;
    } catch (error) {
      throw error;
    }
  },

  // update: async (ID, updates) => {
  //   const { Branch_ID } = updates;
  //   try {
  //     const [result] = await db.query('UPDATE Employee SET Branch_ID = ? WHERE ID = ?', [Branch_ID, ID]);
  //     return result.affectedRows;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  delete: async (ID) => {
    try {
      const [result] = await db.query('DELETE FROM user WHERE user_id = ?', [ID]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  getByUsername: async (username) => {
    try {
      const [rows] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
};

export default User;

// Example usage
console.log("Getting user by name...");
User.getByUsername('madhushankha').then((user) => {
  console.log(user);
}).catch((error) => {
  console.log(error);
});