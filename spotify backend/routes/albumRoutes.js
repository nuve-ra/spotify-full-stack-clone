import express from 'express';
import multer from 'multer';
import { addAlbum, listAlbum, removeAlbum } from '../controllers/albumController.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
router.post('/add', upload.single('image'), addAlbum);
router.get('/list', listAlbum);
router.post('/remove', removeAlbum);

export default router;
