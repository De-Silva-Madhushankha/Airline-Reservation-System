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


export const getCountsByDestination = async (destinationCode, startDate, endDate) => {
  try {
    const [result] = await db.query(
      'SELECT passenger_count_by_destination(? , ?, ?) AS total_passengers',
      [destinationCode, startDate, endDate]
    );
    return result[0].count;
  } catch (error) {
    throw error;
  }
};


export const getCountsByTime = async (startDate, endDate) => {
  try {
    const [result] = await db.query(
      'CALL booking_count_by_passenger_type_proc(?, ?)',
      [startDate, endDate]
    );
    return result[0].count;
  } catch (error) {
    throw error;
  }
};