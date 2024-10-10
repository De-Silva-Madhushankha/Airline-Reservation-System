import express from "express";
import {getOccupiedByFlightId} from "../controllers/seatController.js";
//import {bookSeats} from "../controllers/seatController.js";

const router = express.Router();

router.get('/occupied/:flight_id', getOccupiedByFlightId);
//router.post("/book", bookSeats);

export default router; 