import express from 'express';
import { getModelById , getAllAircrafts, createAircraft} from '../controllers/aircraftController.js'; // Update import based on your structure

const router = express.Router();

router.get('/aircrafts',getAllAircrafts);
router.post('/create-aircraft', createAircraft);



export default router;
