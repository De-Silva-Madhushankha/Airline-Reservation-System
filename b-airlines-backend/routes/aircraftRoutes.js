// backend/routes/aircraftRoutes.js
import express from 'express';
import { getModelById } from '../controllers/aircraftController.js'; // Update import based on your structure

const router = express.Router();

// Route to get a specific aircraft model by ID
// router.get('/aircraft_id', getModelById);
router.get('/models/:aircraft_id', getModelById);


export default router;
