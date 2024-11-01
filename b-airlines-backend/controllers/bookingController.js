import Booking from '../models/bookingModel.js';
import Passenger from '../models/passengerModel.js';
import Seat from '../models/seatModel.js';
import User from '../models/userModel.js';

export const getBookingCost = async (req, res) => {
    try {
        const user_id = req.user.id;

        const { flight_id, passengerSeats } = req.body; // passengerSeats - { passport, seat } , seat - { row, column}
        let totalCost = 0;
        const costs = {};
        
        const discount = await User.getUserDiscount(user_id);
        if (discount === null) {
            return res.status(400).json({ message: `Unable to retrieve discount for user ID ${user_id}` });
        }

        for (const passenger of passengerSeats) {
            const { passport, seat } = passenger;
            const { row, column } = seat;

            const seatCost = await Booking.calculateSeatPrice(flight_id, row, column);

            if (seatCost === null) {
                return res.status(400).json({ message: `Unable to calculate seat price for passport ${passport}` });
            }

            costs[passport] = seatCost;
            totalCost += seatCost;
        }

        res.status(200).json({ costs, totalCost, discount });
         
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// insert a new booking 
export const createBookingController = async (req, res) => {
    const user_id = req.user.id;
    const { flight_id, passengers } = req.body;

    try {
        const bookingIds = await Booking.createBookingWithTransaction(flight_id, passengers, user_id);
        res.status(201).json({ success: true, bookingIds });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to create booking' });
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
    // console.log( id);
    try {
        const booking = await Booking.getBookingByUserId(id);
        if (booking) {
            res.json(booking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
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
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const changeBooking = async (req, res) => {
    const { booking_id, new_plane_type, new_booking_date } = req.body;

    try {
 
        const [currentBooking] = await Booking.getBooking(booking_id);
        if (!currentBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        let extraFee = 0;
        if (currentBooking.plane_type !== new_plane_type) {
            extraFee += 100; 
        }
        if (currentBooking.booking_date !== new_booking_date) {
            extraFee += 50; 
        }

        const newTotalAmount = currentBooking.total_amount + extraFee;


        const updatedRows = await Booking.updateBookingDetails(
            booking_id, 
            new_plane_type, 
            new_booking_date, 
            newTotalAmount
        );

        if (updatedRows) {
            res.status(200).json({ 
                message: 'Booking updated successfully', 
                extraFee, 
                newTotalAmount 
            });
        } else {
            res.status(404).json({ message: 'Booking not updated' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    console.log('Delete booking:', id);
    
    try {
        const affectedRows = await Booking.deleteBooking(id);
        
        if (affectedRows > 0) {
            res.json({ message: 'Booking deleted successfully' });
        } else {
            res.json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const getBookingsByUserId = async (req, res) => {
    const { id } = req.params;  
    try {
        const bookings = await Booking.getBookingByPassengerId(id); 
        if (bookings.length > 0) {
            res.json(bookings);
            
        } else {
            res.status(404).json({ message: 'No bookings found for this user' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getBookingsByFlightId = async (req, res) => {
    const { id } = req.params;
    try {
        const bookings = await Booking.getBookingByFlightId(id);  
        if (bookings.length > 0) {
            res.json(bookings);
        } else {
            res.status(404).json({ message: 'No bookings found for this flight' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getFlightRevenue = async (req, res) => {
    const { id } = req.params;
    try {
        const revenue = await Booking.getRevenue(id);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getRevenueByDateRange = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const revenue = await Booking.getBookingByDateRange(startDate, endDate);
        res.json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getPassengerTypeCount = async (req, res) => {
    const { startDate, endDate } = req.params;
    try {
        const count = await Booking.getPassengerTypeCount(startDate, endDate);
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getPassengerBooking = async (req, res) => {
    const id = req.user.id;
    try {
        const bookings = await Booking.getBookingPassengerByUserId(id);
        //console.log(bookings);
        if (bookings.length > 0) {
            res.json(bookings);
        } else {
            res.status(404).json({ message: 'No bookings found for this passenger' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
