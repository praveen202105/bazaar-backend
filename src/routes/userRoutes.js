import { Router } from 'express';
import userController from '../controllers/userController.js';
import upload from '../middlewares/multer.js';

const router = Router();

// Route for user signup with file upload
router.post('/signup', upload.fields([
  { name: 'pan', maxCount: 1 },
  { name: 'shop_licence', maxCount: 1 },
  { name: 'shop_board', maxCount: 1 }
]), userController.signup);

export default router;
