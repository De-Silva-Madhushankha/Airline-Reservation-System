import express from "express";
import {createBookingController, getBookingCost} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/cost", getBookingCost);
router.post("/create", createBookingController);

export default router;