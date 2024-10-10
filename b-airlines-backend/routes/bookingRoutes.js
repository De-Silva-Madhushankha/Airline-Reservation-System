import express from 'express';
import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getBookingsByUserId,
    getBookingsByFlightId,
    getFlightRevenue,
    getRevenueByDateRange,
    getPassengerTypeCount
} from '../controllers/bookingController.js';

import verifyToken from '../middleware/tokenAuth.js';

const router = express.Router();


// Route to get a booking by ID
router.get('/bookings', verifyToken , getBookingById);

// Route to update a booking by ID
router.put('/bookings/:id', updateBooking);

// Route to delete a booking by ID
router.delete('/bookings/:id', deleteBooking);





export default router;
import express from "express";
import {createBookingController, getBookingCost} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/cost", getBookingCost);
router.post("/create", createBookingController);

export default router;