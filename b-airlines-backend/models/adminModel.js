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
      'SELECT passenger_count_by_destination(? , ?, ?) as count',
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
      'call Get_Passengers_By_Seat_Class(?, ?)',
      [startDate, endDate]
    );
    return {
      Type1: result[0].count ,
      Type2: result[0].count ,
      Type3: result[0].count
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

    return {
      above18: above18[0].count,
      below18: below18[0].count,
    };
  } catch (error) {
    throw error;
  }
};

export const getPastFlightModel = async (originCode, destinationCode, startDate, endDate) => {
  try {
    const [flights] = await db.query(`
      SELECT 
        f.flight_id,
        f.aircraft_id,
        r.origin_code,
        r.destination_code,
        f.departure,
        f.arrival,
        CASE 
            WHEN f.delay = TRUE THEN 'Delayed'
            ELSE 'On Time'
        END AS status,
        COUNT(b.passenger_id) AS passenger_count
      FROM 
        Flight f
      JOIN 
        Route r ON f.route_id = r.route_id
      LEFT JOIN 
        Booking b ON f.flight_id = b.flight_id
      WHERE 
        r.origin_code = ? 
        AND r.destination_code = ? 
        AND f.departure BETWEEN ? AND ?
      GROUP BY 
        f.flight_id, f.aircraft_id, r.origin_code, r.destination_code, f.departure, f.arrival, f.delay
      ORDER BY 
        f.departure DESC;
    `, [originCode, destinationCode, startDate, endDate]);

    return {
      flights,  // Return the fetched flight data
    };
  } catch (error) {
    console.error('Error fetching past flight data:', error);
    throw error;
  }
};


export const updateFlightStatus = async (flight_id, status) => {
  try {
    // Map the status to 1 or 0
    const delayValue = status === 'Delayed' ? 1 : 0;

    // Update the delay status based on the provided status string
    const [result] = await db.query(
      'UPDATE Flight SET delay = ? WHERE flight_id = ?',
      [delayValue, flight_id] // Use the integer value (1 or 0)
    );

    // Check if any rows were affected (optional)
    if (result.affectedRows === 0) {
      throw new Error('No flight found with the provided flight_id');
    }

    return result; // Return the result of the update operation
  } catch (error) {
    throw error; // Propagate error
  }
};


export const getRevenueByAircraftType = async () => {
  try {
    const [result] = await db.query(
      'SELECT aircraft_model, total_revenue FROM Total_Revenue_By_Aircraft_Types'
    );
    return result; // Return the revenue data
  } catch (error) {
    throw error;
  }
};
