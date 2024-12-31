import express from 'express';
import upload from './uploadRoutes'; // Import multer configuration

const router = express.Router();

// Single file upload route
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        console.log(req.file); // Log the uploaded file details
        res.status(200).json({
            message: 'File uploaded successfully',
            file: req.file, // Return the file details to the client
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
