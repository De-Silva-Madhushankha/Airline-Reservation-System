import express from 'express';
import { getRoutes , getDestinations} from '../controllers/routeController.js'; 

const router = express.Router();

router.get('/routes', getRoutes);
router.get('/destination-codes', getDestinations);

export default router;
