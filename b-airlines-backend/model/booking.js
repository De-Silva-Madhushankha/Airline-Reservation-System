import pool from "../database/db"


export async function getRevenue(aircraft_id){
    const [rows] = await pool.query(`
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