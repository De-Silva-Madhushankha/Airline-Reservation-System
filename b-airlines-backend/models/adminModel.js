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



export const getCountsByTime = async (startDate, endDate) => {
  try {
    const [result] = await db.query(
      'call GetReservedSeatCountsByClassAndDateRange(?, ?)',
      [startDate, endDate]
    );
    return {
      result
    };
  } catch (error) {
    throw error;
  }
};

export const getCountsByAge = async (flightNumber) => {
  try {
    const [above18] = await db.query(
      'SELECT COUNT(*) AS count FROM  flight_passenger_age_report WHERE age >= 18 AND flight_id = ?',
      [flightNumber]
    );
    const [below18] = await db.query(
      'SELECT COUNT(*) AS count FROM  flight_passenger_age_report WHERE age <= 18 AND flight_id = ?',
      [flightNumber]
    );
    const [result] = await db.query(
      'SELECT first_name, last_name, age, age_group FROM  flight_passenger_age_report WHERE flight_id = ?',
      [flightNumber]
    );

    return {
      above18: above18[0].count,
      below18: below18[0].count,
      result,
    };
  } catch (error) {
    throw error;
  }
};

export const getPastFlightModel = async (originCode, destinationCode, startDate, endDate) => {
  try {
    const [flights] = await db.query(`
      SELECT * FROM PastFlightsAndPassengerCountView 
      WHERE origin_code = ? 
        AND destination_code = ? 
        AND departure BETWEEN ? AND ?;
    `, [originCode, destinationCode, startDate, endDate]);

    return { flights };
  } catch (error) {
    console.error('Error fetching past flight data:', error);
    throw error;
  }
};





export const updateFlightStatus = async (flight_id, status) => {
  try {
    const delayValue = status === 'Delayed' ? 1 : 0;

    const [result] = await db.query(
      'UPDATE Flight SET delay = ? WHERE flight_id = ?',
      [delayValue, flight_id] 
    );

    if (result.affectedRows === 0) {
      throw new Error('No flight found with the provided flight_id');
    }

    return result; 
  } catch (error) {
    throw error; 
  }
};


export const getRevenueByAircraftType = async () => {
  try {
    const [result] = await db.query(
      'SELECT * FROM RevenueByAircraftType'
    );
    return result;
  } catch (error) {
    throw error;
  }
};



export const getCountsByDestination = async (destinationCode, startDate, endDate) => {
  try {
    const [rows] = await db.query(
      `SELECT COUNT(DISTINCT passenger_id) AS passenger_count FROM passenger_details_by_destination_view WHERE destination_code = ? AND departure BETWEEN ? AND ?`,
      [destinationCode, startDate, endDate]
    );
    
    const [result] = await db.query(
      'SELECT passenger_name, passenger_age FROM passenger_details_by_destination_view WHERE destination_code = ? AND departure BETWEEN ? AND ?',
      [destinationCode, startDate, endDate]
    );
    
    return {
      passenger_count: rows[0]?.passenger_count || 0,
      passenger_details: result
    };
  } catch (error) {
    throw error;
  }
};




export const loadChartData = async () => {
  try {
    const [passengers] = await db.query('SELECT COUNT(*) as count FROM Passenger');
    const [users] = await db.query('SELECT COUNT(*) as count FROM User');
    const [bookings] = await db.query('SELECT COUNT(*) as count FROM Booking');

    return {
      passengers: passengers[0].count,
      users: users[0].count,
      bookings: bookings[0].count,
    };
  } catch (error) {
    throw error;
  }
};
