import express from "express";
import { searchFlights, createFlight, getFlights, updateFlight } from "../controllers/flightController.js";

const router = express.Router();

router.post("/flight-search", searchFlights);
router.post("/create-flight", createFlight);
router.get("/flights", getFlights);
router.put("/update-flight/:flightId", updateFlight);


export default router;