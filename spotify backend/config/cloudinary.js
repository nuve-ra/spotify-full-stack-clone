import { v2 as cloudinary } from 'cloudinary';

const ConnectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });
        console.log('Cloudinary Connected Successfully');
    } catch (error) {
        console.error('Cloudinary Connection Error:', error);
    }
};

export default ConnectCloudinary;
