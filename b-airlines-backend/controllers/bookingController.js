import Booking from '../models/bookingModel.js';
import Passenger from '../models/passengerModel.js';
import Seat from '../models/seatModel.js';

// Controller to calculate booking cost
export const getBookingCost = async (req, res) => {
    try {
        const { flight_id, seat } = req.body;
        const { row, column } = seat; // Assuming seat has row and column properties
        // Call the model to calculate the seat price using the stored function
        const totalCost = await Booking.calculateSeatPrice(flight_id, row, column);

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
export const createBookingController = async (req, res) => {
    const { flight_id, passengers } = req.body; // Extract flight_id and passengers array

    try {
        // Iterate over each passenger and create a booking for each
        const bookingIds = [];
        const bookingDate = new Date(); // Assuming you want to use the current date for the booking
        for (const passenger of passengers) {
            const { firstName, lastName, age, phoneNumber, passport, email, seatRow, seatColumn } = passenger;

            // Calculate the total amount for each passenger's seat (you might want to adjust this based on your logic)
            const total_amount = await Booking.calculateSeatPrice(flight_id, seatRow, seatColumn);
            const passengerId = await Passenger.createPassenger(firstName, lastName, age, phoneNumber, passport, email);
            // need to handle uniqueness of passengers
            const seat_id = await Seat.getSeatId(flight_id, seatRow, seatColumn);            
            const done = await Seat.occupySeat(seat_id);
            // Create the booking and collect the ID
            const bookingId = await Booking.createBooking(flight_id, passengerId, seat_id, total_amount);
            bookingIds.push(bookingId); // Store the created booking ID
        }

        res.status(201).json({ success: true, bookingIds }); // Send back the list of booking IDs
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to create booking' }); // Error handling
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



