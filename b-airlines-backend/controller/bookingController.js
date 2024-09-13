import Booking from '../models/bookingModel.js';

// Function to insert a new booking into the database
exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const booking = await Booking.getAll();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    const { id } = req.params;
    console.log("Requesting booking with id: ", id);
    try {
        const booking = await Booking.getById(id);
        if (booking) {
            res.json(booking);
        } else {
            res.status(404).json({ message: 'booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const affectedRows = await Booking.update(id, updates);
        if (affectedRows) {
            res.json({ message: 'booking updated successfully' });
        } else {
            res.status(404).json({ message: 'booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await Booking.delete(id);
        if (affectedRows) {
            res.json({ message: 'booking deleted successfully' });
        } else {
            res.status(404).json({ message: 'booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get all bookings for a specific user
exports.getBookingsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.getByUserId(id);
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get all bookings for a specific flight
exports.getBookingsByFlightId = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.getByFlightId(id);
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the total revenue for a specific flight
exports.getFlightRevenue = async (req, res) => {
    const { id } = req.params;
    try {
        const revenue = await Booking.getFlightRevenue(id);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the total revenue for date range
exports.getRevenueByDateRange = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const revenue = await Booking.getRevenueByDateRange(startDate, endDate);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Functon to get number of bookings by each passenger type given date range
exports.getPassengerTypeCount = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const count = await Booking.getPassengerTypeCount(startDate, endDate);
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



