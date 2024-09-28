import db from '../database/db.js';
import dotenv from 'dotenv'

dotenv.config()


const Flight = { 

    // Create a new flight
    createFlight: async (flight, result) => {
        db.query("INSERT INTO flight SET ?", flight, function(err, res) {
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
    getFlights: async (result) => {
        db.query("SELECT * FROM flight", function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("flights: ", res);
                result(null, res);
            }
        });
    }, 

    // Search for flights
    search: async (origin, destination, departure, arrival, result) => {
        console.log("origin: ", origin);
        console.log("destination: ", destination);
        console.log("departure: ", departure);
        console.log("arrival: ", arrival);
        try {
            const res = await db.query(
                "SELECT * FROM search_flights WHERE origin_code = ? AND destination_code = ? AND departure >= ? AND arrival <= ?",
                [origin, destination, departure, arrival]
            );
            console.log("flights: ", res);
            return res[0];
        } catch (err) {
            console.log("error: ", err);
            return result(null, err);
        }
    },

    // Get flight by ID 
    getFlightById: async (flight_id, result) => {
        db.query("SELECT * FROM flight WHERE flight_id = ?", flight_id, function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }, 

    // Update a flight
    updateFlight: async (flight_id, flight, result) => {
        db.query("UPDATE flight SET flight_number = ?, departure_date = ?, arrival_date = ?, departure_location = ?, arrival_location = ?, aircraft_id = ? WHERE flight_id = ?", [flight.flight_number, flight.departure_date, flight.arrival_date, flight.departure_location, flight.arrival_location, flight.aircraft_id, flight_id], function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    },  

    // Delete a flight
    deleteFlight: async (flight_id, result) => {
        db.query("DELETE FROM flight WHERE flight_id = ?", flight_id, function(err, res) {
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
        db.query("SELECT SUM(total_amount) as Total Revenue FROM booking WHERE flight_id = ?", flight_id, function(err, res) {
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
        db.query("SELECT * FROM flight WHERE departure_location = ?", departure_location, function(err, res) {
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
        db.query("SELECT * FROM flight WHERE arrival_location = ?", arrival_location, function(err, res) {
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
        db.query("SELECT * FROM flight WHERE departure_date = ?", departure_date, function(err, res) {
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
        db.query("SELECT * FROM flight WHERE arrival_date = ?", arrival_date, function(err, res) {
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
        db.query("SELECT * FROM flight WHERE aircraft_id = ?", aircraft_id, function(err, res) {
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
        db.query("SELECT * FROM flight WHERE flight_number = ?", flight_number, function(err, res) {
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
