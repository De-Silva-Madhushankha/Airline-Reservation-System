import express from 'express';
import { loginAdmin , loadInitialData , getCountbyDestination , getCountbyTime, getCountbyAge, getPastFlights, updateStatus , getRevenueByType } from '../controllers/adminController.js';

const router = express.Router();

router.post('/sign-in', loginAdmin);
router.get('/load-initial-data', loadInitialData);
router.get('/user-count-destination', getCountbyDestination);
router.get('/passenger-count-time', getCountbyTime);
router.get('/user-count-age', getCountbyAge);
router.get('/past-flights-report', getPastFlights);
router.post('/update-flight-status', updateStatus);
router.get('/revenue-by-aircraft-type', getRevenueByType);


export default router;
