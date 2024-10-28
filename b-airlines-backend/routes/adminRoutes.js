import express from 'express';
import { getAllAircrafts } from '../controllers/aircraftController.js';
import { getAllUsers } from '../controllers/userController.js';
import { getModels, createModel } from '../controllers/modelController.js';
import { loginAdmin , loadInitialData , getCountbyDestination , getCountbyTime, getCountbyAge, getPastFlights, updateStatus , getRevenueByType ,getChartData} from '../controllers/adminController.js';

const router = express.Router();

router.post('/sign-in', loginAdmin);
router.get('/load-initial-data', loadInitialData);
router.get('/user-count-destination', getCountbyDestination)
router.get('/passenger-count-time', getCountbyTime)
router.get('/aircrafts', getAllAircrafts,);
router.get('/users', getAllUsers);
router.get('/models', getModels);
router.post('/create-model', createModel);
router.get('/user-count-age', getCountbyAge);
router.get('/past-flights-report', getPastFlights);
router.post('/update-flight-status', updateStatus);
router.get('/revenue-by-aircraft-type', getRevenueByType);
router.get('/load-charts', getChartData);

export default router;
