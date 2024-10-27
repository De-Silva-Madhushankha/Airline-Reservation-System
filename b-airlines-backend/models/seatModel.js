import db from '../database/db.js'
import Passenger from './passengerModel.js'

const Seat = {

    getSeats: async () => {
        const [rows] = await db.query("SELECT * FROM Seat")
        return rows
    },

    getSeatById: async (seat_id) => {
        const [rows] = await db.query("SELECT * FROM Seat WHERE seat_id = ?", [seat_id])
        return rows
    },

    getSeatId: async (flight_id, row, column) => {
        const [rows] = await db.query(`SELECT seat_id FROM Seat WHERE flight_id = ? and seat_row = ? and seat_column = ?`, [flight_id, row, column])
        return rows[0].seat_id
    },

    createSeat: async (seat_number, seat_class, seat_price, aircraft_id) => {
        const [result] = await db.query(
            `INSERT INTO Seat (seat_number, seat_class, seat_price, aircraft_id)
            VALUES(?,?,?,?)`,
            [seat_number, seat_class, seat_price, aircraft_id]
        );
        return result.insertId;
    },

    updateSeat: async (seat_id, seat_number, seat_class, seat_price, aircraft_id) => {
        const [result] = await db.query(`UPDATE Seat 
            SET seat_number = ?, seat_class = ?, seat_price = ?, aircraft_id = ?
            WHERE seat_id = ?`, [seat_number, seat_class, seat_price, aircraft_id, seat_id]);
        return result.affectedRows;
    },

    deleteSeat: async (seat_id) => {
        const [result] = await db.query('DELETE FROM Seat WHERE seat_id = ?', [seat_id]);
        return result.affectedRows;
    },

    getOccupiedByFlightId: async (flight_id) => {
        // occupied first
        const [result] = await db.query(
            `CALL GetSeatsByFlightId(?)`, 
            [flight_id]
        );

        const occupiedRows  = result[0]
        const lockedRows = result[1]

        const occupiedSeats = occupiedRows.map(row => ({
            row: row.seat_row,
            column: row.seat_column
        }));
 
        const lockedSeats = lockedRows.map(row => ({
            row: row.seat_row,
            column: row.seat_column
        }));
        console.log(occupiedSeats)
        return {
            occupiedSeats,
            lockedSeats,
        };
    },

    getSeatBySeatNumber: async (seat_number) => {
        const [rows] = await db.query(`SELECT * FROM Seat WHERE seat_number = ?`, [seat_number])
        return rows
    },

    getSeatBySeatClass: async (seat_class) => {
        const [rows] = await db.query(`SELECT * FROM Seat WHERE seat_class = ?`, [seat_class])
        return rows
    },

    getSeatBySeatPrice: async (seat_price) => {
        const [rows] = await db.query(`SELECT * FROM Seat WHERE seat_price = ?`, [seat_price])
        return rows
    },

    getSeatByAircraftIdAndSeatNumber: async (aircraft_id, seat_number) => {
        const [rows] = await db.query(`SELECT * FROM Seat WHERE aircraft_id = ? AND seat_number = ?`, [aircraft_id, seat_number])
        return rows
    },

    occupySeat: async (seat_id) => {
        const [result] = await db.query(`UPDATE Seat SET is_reserved = 1 WHERE seat_id = ?`, [seat_id]);
        return result.affectedRows; // Return the number of affected rows (should be 1 if successful)
    },

    lockSeatTransaction: async (flight_id, seats) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
    
            const results = [];
            console.log('seeats is', seats)
    
            Object.keys(seats).forEach(async key => {
                const { row, column, className } = seats[key];
                console.log("in the trans" , row, column)
    
                const [result] = await connection.query(`CALL LockSeat(?, ?, ?)`, 
                    [flight_id, row, column]);
    
                results.push(result);
            })
    
            await connection.commit();
            return results; 
    
        } catch (error) {
            await connection.rollback();
            console.error('Error locking seats:', error);
            throw error;
        } finally {
            connection.release();
        }
    },
    
}

export default Seat;
