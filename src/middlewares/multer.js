import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Create Multer storage engine using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'baazar/documents', // Folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'pdf']
  }
});

// Set up Multer middleware
const upload = multer({ storage: storage });

export default upload;
