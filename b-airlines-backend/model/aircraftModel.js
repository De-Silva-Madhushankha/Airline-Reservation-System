import db from '../db.js'

const Aircraft = {

        getAircrafts : async () => {
            const [rows] = await db.query("SELECT * FROM aircraft")
            return rows
        },

        getAircraftById : async (aircraft_id) =>{
            const [rows] = await db.query("SELECT * FROM aircraft WHERE aircraft_id = ?", [aircraft_id])
            return rows
        },

        createAircraft : async (aircraft_name, aircraft_type, aircraft_capacity) => {
            const [result] = await db.query(
                `INSERT INTO aircraft (aircraft_name, aircraft_type, aircraft_capacity) 
                VALUES(?,?,?)`,
                [aircraft_name, aircraft_type, aircraft_capacity]
            );
            return result.insertId;
        },

        updateAircraft : async (aircraft_id, aircraft_name, aircraft_type, aircraft_capacity) => {
            const [result] = await db.query(`UPDATE aircraft 
                SET aircraft_name = ?, aircraft_type = ?, aircraft_capacity = ?
                WHERE aircraft_id = ?`, [aircraft_name, aircraft_type, aircraft_capacity, aircraft_id]);
            return result.affectedRows;
        },

        deleteAircraft : async (aircraft_id) =>{
            const [result] = await db.query('DELETE FROM aircraft WHERE aircraft_id = ?', [aircraft_id]);
            return result.affectedRows;
        },

        getRevenue : async (aircraft_id) => {
            const [rows] = await db.query(`
                SELECT SUM(total_amount) as Total Revenue
                FROM booking
                WHERE  flight_id in (
                    SELECT *
                    FROM flight
                    WHERE aircraft_id = ?
                );
                `, (aircraft_id))
            return rows
        }

}

export default Aircraft;