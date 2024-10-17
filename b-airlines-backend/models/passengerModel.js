// models/passengerModel.js
import db from '../database/db.js'

const Passenger = {  
    // not balanced is registered
    createPassenger: async (firstName, lastName, age, phoneNumber, passport, email) => {
        const [result] = await db.query(
            `INSERT INTO Passenger (passenger_id, first_name, last_name, passport_id, age, phone_number, email) VALUES (UUID(), ?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, passport, age, phoneNumber, email]
        );

        const [rows] = await db.query(
            `SELECT passenger_id FROM Passenger WHERE passport_id = ? LIMIT 1`,
            [passport] // assuming passport_id is unique and can be used to retrieve the passenger
        );
        return rows[0].passenger_id; // or return the UUID if you are using UUIDs as the primary key
    },
}

export default Passenger;
