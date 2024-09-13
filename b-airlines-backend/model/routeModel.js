import db from '../db.js'

const Route = {

    getRoutes : async () => {
        const [rows] = await db.query("SELECT * FROM route")
        return rows
    },

    getRouteById : async (route_id) =>{
        const [rows] = await db.query("SELECT * FROM route WHERE route_id = ?", [route_id])
        return rows
    },

    createRoute : async (route_name, route_distance) => {
        const [result] = await db.query(
            `INSERT INTO route (route_name, route_distance) 
            VALUES(?,?)`,
            [route_name, route_distance]
        );
        return result.insertId;
    },

    updateRoute : async (route_id, route_name, route_distance) => {
        const [result] = await db.query(`UPDATE route 
            SET route_name = ?, route_distance = ?
            WHERE route_id = ?`, [route_name, route_distance, route_id]);
        return result.affectedRows;
    },

    deleteRoute : async (route_id) =>{
        const [result] = await db.query('DELETE FROM route WHERE route_id = ?', [route_id]);
        return result.affectedRows;
    }

}

export default Route;