import express from 'express';
import { loginAdmin , loadInitialData} from '../controllers/adminController.js';

const router = express.Router();

router.post('/sign-in', loginAdmin);
router.get('/load-initial-data', loadInitialData);

export default router;
