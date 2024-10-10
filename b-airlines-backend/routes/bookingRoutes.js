import express from "express";
import {getBookingCost} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/cost", getBookingCost);

export default router;