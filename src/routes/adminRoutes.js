import { Router } from 'express';
import adminController from '../controllers/adminController.js';

const router = Router();

// Route for admin signup
router.post('/signup', adminController.signup);

export default router;
