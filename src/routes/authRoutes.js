import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = Router();

// Route to send OTP
router.post('/send-otp', authController.sendOtp);

// Route to verify OTP
router.post('/verify-otp', authController.verifyOtp);

export default router;
