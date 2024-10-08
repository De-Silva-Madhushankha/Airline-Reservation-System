import db from '../database/db.js';

export const getCounts = async () => {
  try {
    const [users] = await db.query('SELECT COUNT(*) as count FROM User');
    const [aircrafts] = await db.query('SELECT COUNT(*) as count FROM Aircraft');
    const [airports] = await db.query('SELECT COUNT(*) as count FROM Airport');
    const [routes] = await db.query('SELECT COUNT(*) as count FROM Route');

    return {
      users: users[0].count,
      aircrafts: aircrafts[0].count,
      airports: airports[0].count,
      routes: routes[0].count,
    };
  } catch (error) {
    throw error;
  }
};


export const updateAircraft = async (aircraft_id, aircraft_name, aircraft_type, aircraft_capacity) => {
    const [result] = await db.query(`SELECT passenger_count_by_destination(?, ?, ?) AS total_passengers`
, [destination_code, start_date, end_date]);
    return result.affectedRows;
};
