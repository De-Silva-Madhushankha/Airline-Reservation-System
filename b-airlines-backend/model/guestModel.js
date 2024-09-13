import db from '../db.js';

const Guest = {
    getAll: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM passenger');
            return rows;
        } catch (error) {
            throw error;
        }
    },

    create: async (user_id, first_name, last_name, age, phone_number, email) => {
        try {

            let is_registered = 1;
            if (user_id === null) {
                is_registered = 0;
            }
            const [result] = await db.query(
                `INSERT INTO Passenger (user_id, first_name, last_name age, phone_number, email, is_registered) 
                VALUES(?,?,?,?,?,?)`,
                [user_id, first_name, last_name, age, phone_number, email, is_registered]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    update: async (first_name, last_name, age, phone_number, email) => {
      const { Branch_ID } = updates;
      try {
        const [result] = await db.query(`UPDATE passenger 
            SET first_name = ?, last_name = ?, age = ?, phone_number = ?, email = ?`, [Branch_ID, ID]);
        return result.affectedRows;
      } catch (error) {
        throw error;
      }
    },

    delete: async (ID) => {
        try {
            const [result] = await db.query('DELETE FROM passenger WHERE passenger_id = ?', [ID]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    },

    getByPassengerName: async (name) => {
        try {
            const [rows] = await db.query('SELECT * FROM passenger WHERE name = ?', [name]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },
};

export default Guest;