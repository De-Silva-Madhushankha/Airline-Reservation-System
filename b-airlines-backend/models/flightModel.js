import db from '../database/db.js';


const Flight = {

    // Create a new flight
    createFlight: async (route_id, aircraft_id, departure, arrival, result) => {
        db.query("INSERT INTO Flight (flight_id, route_id, aircraft_id, departure, arrival) VALUES (UUID(),?,?,?,? )", [route_id, aircraft_id, departure, arrival], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    },

    // Get all flights
    getFlights: async () => {
        try {
            const [rows] = await db.query("SELECT * FROM Flight");
            console.log("flights: ", rows);
            return rows;
        } catch (err) {
            console.log("error: ", err);
            throw err;
        }
    },

    updateFlight : async (flightId, flightData) => {
        const { route_id, aircraft_id, departure, arrival, delay } = flightData;
        try {
          const [result] = await db.query(
            "UPDATE Flight SET route_id = ?, aircraft_id = ?, departure = ?, arrival = ?, delay = ? WHERE flight_id = ?",
            [route_id, aircraft_id, departure, arrival, delay, flightId]
          );
          return result;
        } catch (err) {
          throw err;
        }
      },

    // Search for flights
    search: async (origin, destination, departure, arrival, result) => {
        //console.log("origin: ", origin);
        // console.log("destination: ", destination);
        // console.log("departure: ", departure);
        // console.log("arrival: ", arrival);
        try {
            const res = await db.query(
                "SELECT * FROM search_flights WHERE origin_code = ? AND destination_code = ? AND departure >= ? AND arrival <= ?",
                [origin, destination, departure, arrival]
            );
            //console.log("flights: ", res);
            return res[0];
        } catch (err) {
            console.log("error: ", err);
            return result(null, err);
        }
    },

    // Get flight by ID 
    getFlightById: async (flight_id, result) => {
        db.query("SELECT * FROM Flight WHERE flight_id = ?", flight_id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    // Delete a flight
    deleteFlight: async (flight_id, result) => {
        db.query("DELETE FROM Flight WHERE flight_id = ?", flight_id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    },

    // Get revenue from a flight
    getRevenue: async (flight_id, result) => {
        db.query("SELECT SUM(total_amount) as Total Revenue FROM Booking WHERE flight_id = ?", flight_id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    },

    // Get all flights by departure location    
    getFlightByDepartureLocation: async (departure_location, result) => {
        db.query("SELECT * FROM Flight WHERE departure_location = ?", departure_location, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    },

    // Get all flights by arrival location  
    getFlightByArrivalLocation: async (arrival_location, result) => {
        db.query("SELECT * FROM Flight WHERE arrival_location = ?", arrival_location, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    },

    // Get all flights by departure date
    getFlightByDepartureDate: async (departure_date, result) => {
        db.query("SELECT * FROM Flight WHERE departure_date = ?", departure_date, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    },

    // Get all flights by arrival date  
    getFlightByArrivalDate: async (arrival_date, result) => {
        db.query("SELECT * FROM Flight WHERE arrival_date = ?", arrival_date, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    },

    // Get all flights by aircraft ID   
    getFlightByAircraftId: async (aircraft_id, result) => {
        db.query("SELECT * FROM Flight WHERE aircraft_id = ?", aircraft_id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    },

    // Get all flights by flight number
    getFlightByFlightNumber: async (flight_number, result) => {
        db.query("SELECT * FROM Flight WHERE flight_number = ?", flight_number, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }

}

export default Flight;
