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

export const getCountsByAge = async (flightNumber) => {
  try {
    const [above18] = await db.query(
      'SELECT COUNT(*) AS COUNT_ABOVE_18 FROM  User WHERE role_id = ?',
      [flightNumber]
    );
    const [below18] = await db.query(
      'SELECT COUNT(*) AS COUNT_BELOW_18 FROM User WHERE role_id = ?',
      [flightNumber]
    );

    const pax_count = await db.query(
      `select 
          pax_above_18.count AS pax_above_18,
            pax_below_18.count AS pax_below_18
        from
        (SELECT COUNT(*) AS count FROM User WHERE role_id = ?) pax_above_18,
        (SELECT COUNT(*) AS count FROM User WHERE role_id = ?) pax_below_18`,
      [flightNumber, flightNumber]
    );

    return pax_count[0][0];
  } catch (error) {
    throw error;
  }
};

// export const getCountsByAge = async (flightNumber) => {
//   try {
//     const [above18] = await db.query(
//       'SELECT * FROM flight_passenger_age_report WHERE flight_id = ? AND age_group > 18;',
//       [flightNumber]
//     );
//     const [below18] = await db.query(
//       'SELECT * FROM flight_passenger_age_report WHERE flight_id = ? AND age_group < 18;',
//       [flightNumber]
//     );
//     return result[0].count;
//   } catch (error) {
//     throw error;
//   }
// };