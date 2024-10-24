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


// export const getCountsByDestination = async (destinationCode, startDate, endDate) => {
//   try {
//     // Query to get passenger count
//     const [rows] = await db.query(
//       'SELECT COUNT(DISTINCT passenger_id) AS passenger_count FROM passenger_details_by_destination_view WHERE destination_code = ? AND departure BETWEEN ? AND ?',
//       [destinationCode, startDate, endDate]
//     );
    
//     // Query to get passenger details (name, age)
//     const [result] = await db.query(
//       'SELECT passenger_name, passenger_age FROM passenger_details_by_destination_view WHERE destination_code = ? AND departure BETWEEN ? AND ?',
//       [destinationCode, startDate, endDate]
//     );
    
//     // Access the count from the first row
//     const passengerCount = rows[0]?.passenger_count || 0; // Handle if there are no rows

//     // Return the count and passenger details
//     return {
//       passenger_count: passengerCount,
//       passenger_details: result
//     };
//   } catch (error) {
//     throw error;
//   }
// };



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
      'SELECT * FROM RevenueByAircraftType'
    );
    return result; // Return the revenue data
  } catch (error) {
    throw error;
  }
};



export const getCountsByDestination = async (destinationCode, startDate, endDate) => {
  try {
    // Call the stored procedure
    const [rows] = await db.query(
      `SELECT COUNT(DISTINCT passenger_id) AS passenger_count FROM passenger_details_by_destination_view WHERE destination_code = ? AND departure BETWEEN ? AND ?`,
      [destinationCode, startDate, endDate]
    );
    
    // Query to get passenger details (name, age)
    const [result] = await db.query(
      'SELECT distinct passenger_name, passenger_age FROM passenger_details_by_destination_view WHERE destination_code = ? AND departure BETWEEN ? AND ?',
      [destinationCode, startDate, endDate]
    );
    
    // Return the count and passenger details
    return {
      passenger_count: rows[0]?.passenger_count || 0, // Access the count from the first row or default to 0 if not found
      passenger_details: result
    };
  } catch (error) {
    throw error;
  }
};
