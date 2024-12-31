import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from './cloudinaryConfig.js';

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Cloudinary folder where files will be stored
        allowed_formats: ['jpg', 'png', 'mp3', 'wav'], // Allow specific file formats
    },
});

// Initialize multer with the Cloudinary storage
const upload = multer({ storage });

export default upload;
