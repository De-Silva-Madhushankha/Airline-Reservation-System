// models/passengerModel.js
import db from '../database/db.js'

const Passenger = {
    createPassenger: async (firstName, lastName, age, phoneNumber, passport, email) => {
        const [rows] = await db.query(
            `CALL AddOrGetPassenger(?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, passport, age, phoneNumber, email]
        );

        return rows[0][0].passenger_id;
    },
};

export default Passenger;
