import express from "express";
import {searchFlights, createFlight } from "../controllers/flightController.js";

const router = express.Router();

router.post("/flight-search", searchFlights);
router.post("/create-flight", createFlight);

export default router;