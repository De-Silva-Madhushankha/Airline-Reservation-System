import Booking from '../models/bookingModel.js';

// Controller to calculate booking cost
export const getBookingCost = async (req, res) => {
    try {
        console.log('hehe')
        const { flight_id, seat } = req.body;
        const { row, column } = seat; // Assuming seat has row and column properties
        console.log('booking controller' , flight_id, row, column)
        // Call the model to calculate the seat price using the stored function
        const totalCost = await Booking.calculateSeatPrice(flight_id, row, column);
        console.log('totoal cost', totalCost)
        if (totalCost === null) {
            return res.status(400).json({ message: 'Unable to calculate seat price' });
        }

        // Return the calculated price in the response
        res.status(200).json({ totalCost });
    } catch (error) {
        // Handle any server errors
        res.status(500).json({ error: error.message });
    }
};

// Function to insert a new booking into the database
export const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const booking = await Booking.getAll();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBookingById = async (req, res) => {
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

export const updateBooking = async (req, res) => {
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

export const deleteBooking = async (req, res) => {
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
export const getBookingsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.getByUserId(id);
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get all bookings for a specific flight
export const getBookingsByFlightId = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.getByFlightId(id);
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the total revenue for a specific flight
export const getFlightRevenue = async (req, res) => {
    const { id } = req.params;
    try {
        const revenue = await Booking.getFlightRevenue(id);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the total revenue for date range
export const getRevenueByDateRange = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const revenue = await Booking.getRevenueByDateRange(startDate, endDate);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Functon to get number of bookings by each passenger type given date range
export const getPassengerTypeCount = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const count = await Booking.getPassengerTypeCount(startDate, endDate);
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



