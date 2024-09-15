import express from 'express';
import {registerUser, loginUser} from '../controller/userController.js';

const router = express.Router();



router.post('/sign-up', registerUser);
router.post('/sign-in', loginUser);



export default router;