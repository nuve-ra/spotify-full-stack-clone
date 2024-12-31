// albumRoute.js
import express from 'express';
import { addAlbum,listAlbum,removeAlbum} from '../controllers/albumController.js';
import upload from '../middleware/multer.js';
const albumRouter = express.Router();

// Define your routes
albumRouter.get('/add', upload.single('image'), addAlbum);

albumRouter.post('/list', listAlbum);
albumRouter.post('/remove', removeAlbum);

export default albumRouter;
