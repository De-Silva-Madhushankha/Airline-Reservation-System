import express from "express";
import {searchFlights} from "../controllers/flightController.js";

const router = express.Router();

router.post("/book", bookSeats);

export default router;