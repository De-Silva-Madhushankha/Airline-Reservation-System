import express from 'express';
import { loginAdmin , loadInitialData , getCountbyDestination , getCountbyTime} from '../controllers/adminController.js';
import { getAllAircrafts } from '../controllers/aircraftController.js';
import { getAllUsers } from '../controllers/userController.js';
import { getModels, createModel } from '../controllers/modelController.js';

const router = express.Router();

router.post('/sign-in', loginAdmin);
router.get('/load-initial-data', loadInitialData);
router.get('/user-count-destination', getCountbyDestination)
router.get('/passenger-count-time', getCountbyTime)
router.get('/aircrafts', getAllAircrafts,);
router.get('/users', getAllUsers);
router.get('/models', getModels);
router.post('/create-model', createModel);

export default router;
