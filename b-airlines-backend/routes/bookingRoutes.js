import express from 'express';
import {createBookingController, getBookingCost} from "../controllers/bookingController.js";
import {
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getBookingsByUserId,
    getPassengerBooking,
    getBookingsByFlightId,
    getFlightRevenue,
    getRevenueByDateRange,
    getPassengerTypeCount,
    changeBooking
} from '../controllers/bookingController.js';

import verifyToken from '../middleware/tokenAuth.js';

const router = express.Router();


// Route to get a booking by ID
router.get('/bookings', verifyToken , getBookingById);

// Route to update a booking by ID
router.put('/bookings/:id', updateBooking);

// Route to delete a booking by ID
router.delete('/bookings/:id', deleteBooking);

router.post("/cost", verifyToken, getBookingCost);
router.post("/create",verifyToken, createBookingController);

router.put('/bookings/:id/change', verifyToken, changeBooking);

router.get('/bookings-passengers', verifyToken, getPassengerBooking);


export default router;