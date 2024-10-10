import Booking from '../models/bookingModel.js';

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
    const id = req.user.id;
    console.log( id);
    console.log("hey")
    try {
        const [booking] = await Booking.getBookingByUserId(id);
        console.log(booking);
        if (booking) {
            res.json([booking]);
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
    console.log('Delete booking:',id);
    try {
        const affectedRows = await Booking.deleteBooking(id); // Updated method call
        if (affectedRows) {
            res.json({ message: 'Booking deleted successfully' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get all bookings for a specific user (passenger)
export const getBookingsByUserId = async (req, res) => {
    const { id } = req.params;  // `id` is the passenger_id in this case
    try {
        const bookings = await Booking.getBookingByPassengerId(id);  // Updated method call
        if (bookings.length > 0) {
            res.json(bookings);
        } else {
            res.status(404).json({ message: 'No bookings found for this user' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get all bookings for a specific flight
export const getBookingsByFlightId = async (req, res) => {
    const { id } = req.params;
    try {
        const bookings = await Booking.getBookingByFlightId(id);  // Updated method call
        if (bookings.length > 0) {
            res.json(bookings);
        } else {
            res.status(404).json({ message: 'No bookings found for this flight' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the total revenue for a specific flight
export const getFlightRevenue = async (req, res) => {
    const { id } = req.params;
    try {
        const revenue = await Booking.getRevenue(id);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get the total revenue for date range
export const getRevenueByDateRange = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const revenue = await Booking.getBookingByDateRange(startDate, endDate);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get number of bookings by each passenger type given date range
export const getPassengerTypeCount = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const count = await Booking.getPassengerTypeCount(startDate, endDate);
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
