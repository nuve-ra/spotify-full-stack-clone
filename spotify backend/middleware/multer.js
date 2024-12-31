import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Set the directory where files will be saved
        callback(null, './uploads'); // Replace './uploads' with your desired directory
    },
    filename: function (req, file, callback) {
        // Set the file name with the original name and a timestamp to avoid overwriting
        callback(null, Date.now() + '-' + file.originalname);
    },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

export default upload;
