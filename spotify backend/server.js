import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import songRouter from './routes/songRoutes.js';
import albumRouter from './routes/albumRoute.js';
import connectDB from './config/mongodb.js';
import ConnectCloudinary from './config/cloudinary.js';
import upload from './middleware/multer.js';

// Load environment variables
dotenv.config();

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Debug environment variables (without exposing sensitive data)
console.log('Environment Check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', port);
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('CLOUDINARY_NAME exists:', !!process.env.CLOUDINARY_NAME);
console.log('CLOUDINARY_API_KEY exists:', !!process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_SECRET_KEY exists:', !!process.env.CLOUDINARY_SECRET_KEY);

// Database and Cloudinary connections with better error handling
const initializeApp = async () => {
    try {
        await connectDB();
        console.log('MongoDB connected successfully');
        await ConnectCloudinary();
        console.log('Cloudinary connected successfully');
    } catch (error) {
        console.error('Initialization error:', error);
        process.exit(1);
    }
};
initializeApp();

// CORS configuration
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/', async (req, res) => {
    try {
        res.json({
            success: true,
            message: "API is Working",
            environment: process.env.NODE_ENV,
            timestamp: new Date().toISOString(),
            mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
        });
    } catch (error) {
        console.error('Health check error:', error);
        res.status(500).json({
            success: false,
            message: "Health check failed",
            error: error.message
        });
    }
});

// API Routes with error handling
app.use('/api/song', (req, res, next) => {
    console.log('Song route accessed:', req.method, req.path);
    next();
}, songRouter);

app.use('/api/album', (req, res, next) => {
    console.log('Album route accessed:', req.method, req.path);
    next();
}, albumRouter);

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }
        console.log('File uploaded:', req.file);
        res.json({
            success: true,
            message: 'File uploaded successfully',
            file: req.file
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error.message
        });
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
});

// Handle 404
app.use((req, res) => {
    console.log('404 - Route not found:', req.method, req.path);
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path,
        method: req.method
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Server URL: ${process.env.NODE_ENV === 'production' ? 'https://spotify-backend-jbda.onrender.com' : 'http://localhost:' + port}`);
});
