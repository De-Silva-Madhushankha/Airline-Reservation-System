import db from '../database/db.js'

const Aircraft = {

        getAircrafts : async () => {
            const [rows] = await db.query("SELECT * FROM Aircraft")
            return rows
        },

        getModelById : async (aircraft_id) =>{
            const [rows ]= await db.query("SELECT model FROM Aircraft WHERE aircraft_id = ?", [aircraft_id])
            return rows
        },

        getAircraftById : async (aircraft_id) =>{
            const [rows] = await db.query("SELECT * FROM Aircraft WHERE aircraft_id = ?", [aircraft_id])
            return rows
        },

        createAircraft : async (aircraft_name, aircraft_type, aircraft_capacity) => {
            const [result] = await db.query(
                `INSERT INTO Aircraft (aircraft_name, aircraft_type, aircraft_capacity) 
                VALUES(?,?,?)`,
                [aircraft_name, aircraft_type, aircraft_capacity]
            );
            return result.insertId;
        },

        updateAircraft : async (aircraft_id, aircraft_name, aircraft_type, aircraft_capacity) => {
            const [result] = await db.query(`UPDATE Aircraft 
                SET aircraft_name = ?, aircraft_type = ?, aircraft_capacity = ?
                WHERE aircraft_id = ?`, [aircraft_name, aircraft_type, aircraft_capacity, aircraft_id]);
            return result.affectedRows;
        },

        deleteAircraft : async (aircraft_id) =>{
            const [result] = await db.query('DELETE FROM Aircraft WHERE aircraft_id = ?', [aircraft_id]);
            return result.affectedRows;
        },

        getRoutes : async () => {
            const [rows] = await db.query("SELECT * FROM Route")
            console.log(rows)
            return rows
        },

        getRevenue : async (aircraft_id) => {
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
        }

}

export default Aircraft;