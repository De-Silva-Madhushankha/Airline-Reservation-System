import Flight from '../models/flightModel.js';
//import moment from 'moment';
//import dotenv from 'dotenv';

//dotenv.config();
// Function to  get, Given a flight no, all passengers travelling in it (next immediate flight) below age 18,above age 18 
export const getPassengerByFlightId = async (req, res) => {
    const { id } = req.params;
    try {
        const passengers = await Flight.getPassengerByFlightId(id);
        res.json(passengers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the total revenue for a specific flight
export const getFlightRevenue = async (req, res) => {
    const { id } = req.params;
    try {
        const revenue = await Flight.getFlightRevenue(id);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the total revenue for date range
export const getRevenueByDateRange = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const revenue = await Flight.getRevenueByDateRange(startDate, endDate);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get number of bookings by each passenger type given date range
export const getPassengerTypeCount = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const count = await Flight.getPassengerTypeCount(startDate, endDate);
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the number of passengers travelling to a given destination given date range
export const getDestinationPassengerCount = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const count = await Flight.getDestinationPassengerCount(startDate, endDate);
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchFlights = async (req, res) => {
    const { origin, destination, dates } = req.body;
    //console.log("Search values: ", req.body);
    //console.log(dates);
    const departureDate = dates[0];
    const arrivalDate = dates[1];
    console.log(departureDate, arrivalDate);
    try {
        const flights = await Flight.search(origin, destination, departureDate, arrivalDate);
        console.log("Search results: ", flights);
        res.json({ flights });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createFlight = async (req, res) => {
    console.log("Request body: ", req.body);
    const route_id = req.body.route_id;
    const aircraft_id = req.body.aircraft_id;
    const departure = req.body.departure;
    const arrival = req.body.arrival;

    try {
        const newFlight = await Flight.createFlight(route_id, aircraft_id, departure, arrival);
        res.json(newFlight);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};