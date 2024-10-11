import express from 'express';
import { getModelById , getAllAircrafts, createAircraft} from '../controllers/aircraftController.js'; // Update import based on your structure

const router = express.Router();

router.get('/models/:aircraft_id/',getModelById);
router.post('/create-aircraft', createAircraft);

export default router;
