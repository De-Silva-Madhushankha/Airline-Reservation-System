import Flight from '../models/flightModel.js';

// Function to  get, Given a flight no, all passengers travelling in it (next immediate flight) below age 18,above age 18 
exports.getPassengerByFlightId = async (req, res) => {
    const { id } = req.params;
    try {
        const passengers = await Flight.getPassengerByFlightId(id);
        res.json(passengers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the total revenue for a specific flight
exports.getFlightRevenue = async (req, res) => {
    const { id } = req.params;
    try {
        const revenue = await Flight.getFlightRevenue(id);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the total revenue for date range
exports.getRevenueByDateRange = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const revenue = await Flight.getRevenueByDateRange(startDate, endDate);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get number of bookings by each passenger type given date range
exports.getPassengerTypeCount = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const count = await Flight.getPassengerTypeCount(startDate, endDate);
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the number of passengers travelling to a given destination given date range
exports.getDestinationPassengerCount = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const count = await Flight.getDestinationPassengerCount(startDate, endDate);
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};