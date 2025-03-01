// albumRoute.js
import express from 'express';
import { addAlbum, listAlbum, removeAlbum, getAlbumSongs } from '../controllers/albumController.js';
import upload from '../middleware/multer.js';
const albumRouter = express.Router();

// Define your routes
albumRouter.post('/add', upload.single('image'), addAlbum);

albumRouter.get('/list', listAlbum);
albumRouter.delete('/remove', removeAlbum);
albumRouter.get('/:albumId/songs', getAlbumSongs);

export default albumRouter;
