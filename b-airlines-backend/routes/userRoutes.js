import express from 'express';
import {registerUser, loginUser, getUserProfile, updateUser } from '../controllers/userController.js';
import verifyToken from '../middleware/tokenAuth.js';
const router = express.Router();



router.post('/sign-up', registerUser);
router.post('/sign-in', loginUser);
router.get('/profile', verifyToken, getUserProfile);
router.put('/update', verifyToken, updateUser);



export default router;