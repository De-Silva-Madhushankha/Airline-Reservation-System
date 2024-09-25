import Flight from '../models/flightModel.js';
import moment from 'moment';

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
    const departureDate = moment(dates[0]).format("YYYY-MM-DD");
    const arrivalDate = moment(dates[1]).format("YYYY-MM-DD");
    //console.log(departureDate, arrivalDate);
    try {
        const flights = await Flight.search(origin, destination, departureDate, arrivalDate);
        //console.log("Search results: ", flights);
        res.json({ flights });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}