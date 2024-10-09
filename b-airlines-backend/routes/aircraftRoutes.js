// backend/routes/aircraftRoutes.js
import express from 'express';
import { getModelById , getAllAircrafts} from '../controllers/aircraftController.js'; // Update import based on your structure

const router = express.Router();


router.get('/models/:aircraft_id', getModelById);
router.get('/aircrafts',getAllAircrafts);



export default router;
