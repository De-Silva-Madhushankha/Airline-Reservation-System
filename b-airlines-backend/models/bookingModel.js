import db from '../db.js'


const Booking = {  

    getBooking: async (booking_id) =>{
        const [rows] = await db.query(`SELECT * FROM Booking WHERE booking_id = ?`, [booking_id])
        return rows
    },  

    createBooking: async (flight_id, passenger_id, total_amount, booking_date) => {
        const [result] = await db.query(
            `INSERT INTO Booking (flight_id, passenger_id, total_amount, booking_date) 
            VALUES(?,?,?,?)`,
            [flight_id, passenger_id, total_amount, booking_date]
        );
        return result.insertId;
    },

    updateBooking: async (booking_id, flight_id, passenger_id, total_amount, booking_date) =>{
        const [result] = await db.query(`UPDATE Booking 
            SET flight_id = ?, passenger_id = ?, total_amount = ?, booking_date = ?
            WHERE booking_id = ?`, [flight_id, passenger_id, total_amount, booking_date, booking_id]);
        return result.affectedRows;
    },

    deleteBooking: async (booking_id) => {
        const [result] = await db.query('DELETE FROM Booking WHERE booking_id = ?', [booking_id]);
        return result.affectedRows;
    },

    getRevenue: async (aircraft_id) =>{
        const [rows] = await db.query(`
            SELECT SUM(total_amount) as Total Revenue
            FROM Booking
            WHERE  flight_id in (
                SELECT *
                FROM Flight
                WHERE aircraft_id = ?
            );
            `, (aircraft_id))
        return rows
    },

    getBookingByPassengerId: async (passenger_id) => {
        const [rows] = await db.query(`SELECT * FROM Booking WHERE passenger_id = ?`, [passenger_id])
        return rows
    },  

    getBookingByFlightId: async (flight_id) =>{
        const [rows] = await db.query(`SELECT * FROM Booking WHERE flight_id = ?`, [flight_id])
        return rows
    },  

    getBookingByDate: async (booking_date) => {
        const [rows] = await db.query(`SELECT * FROM Booking WHERE booking_date = ?`, [booking_date])
        return rows
    },

    getBookingByTotalAmount: async (total_amount) =>{
        const [rows] = await db.query(`SELECT * FROM Booking WHERE total_amount = ?`, [total_amount])
        return rows
    },

    getBookingByDateRange: async (booking_date1, booking_date2) => {
        const [rows] = await db.query(`SELECT * FROM Booking WHERE booking_date BETWEEN ? AND ?`, [booking_date1, booking_date2])
        return rows
    }, 

    getBookingByTotalAmountRange: async (total_amount1, total_amount2) => {
        const [rows] = await db.query(`SELECT * FROM Booking WHERE total_amount BETWEEN ? AND ?`, [total_amount1, total_amount2])
        return rows
    }

}

export default Booking;