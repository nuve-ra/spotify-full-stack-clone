import { addSong, listSong, removeSong, updateSong } from '../controllers/songController.js';
import express from 'express';
import upload from '../middleware/multer.js';

const songRouter = express.Router();

// Configure multer for multiple file uploads
const uploadFields = upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]);

songRouter.post('/add', uploadFields, addSong);
songRouter.get('/list', listSong);
songRouter.post('/remove', removeSong);
songRouter.put('/update/:id', updateSong);

export default songRouter;