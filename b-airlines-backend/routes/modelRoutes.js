// backend/routes/modelRoutes.js
import express from 'express';
import { getModels, getModelDetails } from '../controllers/modelController.js'; // Update import

const router = express.Router();

router.get('/models', getModels);
// router.get('/aircraft_id', getModelDetails); // Change ':mode' to ':model'

// Other CRUD routes (create, update, delete) can be added here

export default router;
