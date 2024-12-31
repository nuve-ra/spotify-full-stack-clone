import express from 'express';
import cors from 'cors'; // Importing cors once
import dotenv from 'dotenv'; // Explicit import for clarity
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

// Database and Cloudinary connections
connectDB();
ConnectCloudinary();

// Middleware
app.use(express.json());
app.use(cors()); // Apply CORS middleware

// Define the upload route directly
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file); // Log the uploaded file details
    res.send('File uploaded successfully');
});

// API Routes
app.use('/api/song', songRouter);
app.use('/api/album', albumRouter);

// Root route
app.get('/', (req, res) => {
    res.send("API is Working");
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        message: 'Something went wrong!',
        error: err.message,
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
