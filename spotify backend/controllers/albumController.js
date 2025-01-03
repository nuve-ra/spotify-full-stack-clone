import {v2 as cloudinary} from "cloudinary";
import albumModels from "../models/albumModels.js";
import fs from 'fs/promises';

export const addAlbum = async (req, res) => {
    try {
        const { name, bgColor, des } = req.body;
        const imageFile = req.file;

        if (!name || !des || !imageFile) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        
        // Clean up the temporary file
        await fs.unlink(imageFile.path).catch(console.error);

        const albumData = {
            name,
            des,
            bgColor: bgColor || "#ffffff",
            image: imageUpload.secure_url
        };

        const album = new albumModels(albumData);
        await album.save();
        
        res.json({ success: true, message: "Album added successfully" });
    } catch (error) {
        console.error("Error in addAlbum:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const listAlbum = async (req, res) => {
    try {
        console.log('Fetching albums...');
        const albums = await albumModels.find().sort({ createdAt: -1 });
        console.log('Found albums:', albums.length);
        
        res.status(200).json({ 
            success: true, 
            count: albums.length,
            albums,
            message: "Albums fetched successfully"
        });
    } catch (error) {
        console.error("Error in listAlbum:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching albums",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

export const removeAlbum = async (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({ success: false, message: "Album ID is required" });
        }

        const album = await albumModels.findById(id);
        
        if (!album) {
            return res.status(404).json({ success: false, message: "Album not found" });
        }

        // Extract Cloudinary public ID from the URL
        const publicId = album.image.split('/').pop().split('.')[0];
        
        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(publicId);
        
        // Delete album from database
        await albumModels.findByIdAndDelete(id);

        res.json({ success: true, message: "Album deleted successfully" });
    } catch (error) {
        console.error("Error in removeAlbum:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAlbumSongs = async (req, res) => {
    try {
        const { albumId } = req.params;
        const album = await albumModels.findById(albumId).populate('songs');
        
        if (!album) {
            return res.status(404).json({
                success: false,
                message: "Album not found"
            });
        }

        res.status(200).json({
            success: true,
            songs: album.songs || [],
            message: "Songs fetched successfully"
        });
    } catch (error) {
        console.error("Error in getAlbumSongs:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching songs",
            error: error.message
        });
    }
};
