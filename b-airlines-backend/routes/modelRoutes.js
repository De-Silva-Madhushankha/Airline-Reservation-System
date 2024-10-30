import express from 'express';
import { getModels, getModelDetails } from '../controllers/modelController.js';

const router = express.Router();

router.get('/model', getModels);
router.get('/:model', getModelDetails);
// router.get('/aircraft_id', getModelDetails); // Change ':mode' to ':model'



export default router;
