import express from 'express';
import {registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import verifyToken from '../middleware/tokenAuth.js';
const router = express.Router();



router.post('/sign-up', registerUser);
router.post('/sign-in', loginUser);
router.get('/profile/:email', verifyToken, getUserProfile);



export default router;