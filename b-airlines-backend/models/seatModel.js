import db from '../db.js'


const Seat = {

    getSeats : async () => {
        const [rows] = await db.query("SELECT * FROM seat")
        return rows
    },

    getSeatById : async (seat_id) =>{
        const [rows] = await db.query("SELECT * FROM seat WHERE seat_id = ?", [seat_id])
        return rows
    },

    createSeat : async (seat_number, seat_class, seat_price, aircraft_id) => {  
        const [result] = await db.query(
            `INSERT INTO seat (seat_number, seat_class, seat_price, aircraft_id)
            VALUES(?,?,?,?)`,
            [seat_number, seat_class, seat_price, aircraft_id]
        );  
        return result.insertId;
    },
    
    updateSeat : async (seat_id, seat_number, seat_class, seat_price, aircraft_id) => {
        const [result] = await db.query(`UPDATE seat 
            SET seat_number = ?, seat_class = ?, seat_price = ?, aircraft_id = ?
            WHERE seat_id = ?`, [seat_number, seat_class, seat_price, aircraft_id, seat_id]);
        return result.affectedRows;
    },

    deleteSeat : async (seat_id) =>{
        const [result] = await db.query('DELETE FROM seat WHERE seat_id = ?', [seat_id]);
        return result.affectedRows;
    },

    getSeatByAircraftId : async (aircraft_id) => {
        const [rows] = await db.query(`SELECT * FROM seat WHERE aircraft_id = ?`, [aircraft_id])
        return rows
    },

    getSeatBySeatNumber : async (seat_number) => {
        const [rows] = await db.query(`SELECT * FROM seat WHERE seat_number = ?`, [seat_number])
        return rows
    },

    getSeatBySeatClass : async (seat_class) => {
        const [rows] = await db.query(`SELECT * FROM seat WHERE seat_class = ?`, [seat_class])
        return rows
    },

    getSeatBySeatPrice : async (seat_price) => {
        const [rows] = await db.query(`SELECT * FROM seat WHERE seat_price = ?`, [seat_price])
        return rows
    },

    getSeatByAircraftIdAndSeatNumber : async (aircraft_id, seat_number) => {
        const [rows] = await db.query(`SELECT * FROM seat WHERE aircraft_id = ? AND seat_number = ?`, [aircraft_id, seat_number])
        return rows
    },

}

export default Seat;
