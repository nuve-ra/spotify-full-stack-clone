import { v2 as cloudinary } from "cloudinary";
import songModels from "../models/songModels.js";
import fs from 'fs';

export const addSong = async (req, res) => {
    try {
        const { name, des } = req.body;
        const audioFile = req.files?.audio?.[0];
        const imageFile = req.files?.image?.[0];

        // Debug logging
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        // Check if files are provided
        if (!audioFile || !imageFile) {
            return res.status(400).json({ 
                success: false, 
                message: "Both audio and image files are required",
                receivedFiles: req.files 
            });
        }

        // Upload audio and image files to Cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { 
            resource_type: "auto",
            folder: "spotify/songs" 
        });
        
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
            resource_type: "image",
            folder: "spotify/images" 
        });

        // Extract and format duration if available
        const duration = audioUpload.duration
            ? `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60).toString().padStart(2, '0')}`
            : "0:00";

        // Prepare song data
        const songData = {
            title: name,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            des,
            duration,
        };
        
        // Save the song in the database
        const song = new songModels(songData);
        await song.save();

        // Clean up uploaded files
        try {
            if (audioFile.path) fs.unlinkSync(audioFile.path);
            if (imageFile.path) fs.unlinkSync(imageFile.path);
        } catch (cleanupError) {
            console.error('Error cleaning up files:', cleanupError);
        }

        res.json({ 
            success: true, 
            message: "Song added successfully",
            song: songData
        });
    } catch (error) {
        console.error('Error in addSong:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error adding song", 
            error: error.message 
        });
    }
};

export const listSong = async (req, res) => {
    try {
        const songs = await songModels.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            songs,
            message: "Songs fetched successfully"
        });
    } catch (error) {
        console.error('Error in listSong:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching songs", 
            error: error.message 
        });
    }
};

export const removeSong = async (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({ 
                success: false, 
                message: "Song ID is required" 
            });
        }

        // Find the song first to get the file URLs
        const song = await songModels.findById(id);
        if (!song) {
            return res.status(404).json({ 
                success: false, 
                message: "Song not found" 
            });
        }

        // Delete from Cloudinary if URLs exist
        try {
            if (song.file) {
                const audioPublicId = song.file.split('/').slice(-1)[0].split('.')[0];
                await cloudinary.uploader.destroy(audioPublicId, { resource_type: "video" });
            }
            if (song.image) {
                const imagePublicId = song.image.split('/').slice(-1)[0].split('.')[0];
                await cloudinary.uploader.destroy(imagePublicId, { resource_type: "image" });
            }
        } catch (cloudinaryError) {
            console.error('Error deleting files from Cloudinary:', cloudinaryError);
        }

        // Delete from database
        await songModels.findByIdAndDelete(id);
        
        res.json({ 
            success: true, 
            message: "Song removed successfully" 
        });
    } catch (error) {
        console.error('Error in removeSong:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error removing song", 
            error: error.message 
        });
    }
};