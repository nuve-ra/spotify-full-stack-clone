import { v2 as cloudinary } from "cloudinary";
import songModels from "../models/songModels.js";
import fs from 'fs';

export const addSong = async (req, res) => {
    try {
        const { name, des, artist, album } = req.body;
        const audioFile = req.files?.audio?.[0];
        const imageFile = req.files?.image?.[0];

        // Debug logging
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        // Validate required fields
        if (!name || !des || !album) {
            return res.status(400).json({
                success: false,
                message: "Name, description, and album are required"
            });
        }

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
            artist: artist || "Unknown Artist",
            album: album,  // Save the album ID
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            des,
            duration,
        };
        
        console.log('Saving song with data:', songData);
        
        // Save the song in the database
        const song = new songModels(songData);
        await song.save();

        // Clean up uploaded files
        try {
            fs.unlinkSync(audioFile.path);
            fs.unlinkSync(imageFile.path);
        } catch (err) {
            console.error('Error cleaning up files:', err);
        }

        res.status(201).json({
            success: true,
            song,
            message: "Song added successfully"
        });

    } catch (error) {
        console.error('Error in addSong:', error);
        
        // Clean up uploaded files in case of error
        if (req.files) {
            Object.values(req.files).flat().forEach(file => {
                try {
                    fs.unlinkSync(file.path);
                } catch (err) {
                    console.error('Error cleaning up file:', err);
                }
            });
        }

        res.status(500).json({
            success: false,
            message: "Error adding song",
            error: error.message
        });
    }
};

export const listSong = async (req, res) => {
    try {
        console.log('Fetching songs...');
        const songs = await songModels.find()
            .select('title artist album image des file duration createdAt')
            .sort({ createdAt: -1 });
        
        console.log('Found songs:', songs.length);
        
        res.status(200).json({
            success: true,
            count: songs.length,
            songs,
            message: "Songs fetched successfully"
        });
    } catch (error) {
        console.error('Error in listSong:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching songs", 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

export const updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find and update the song
        const updatedSong = await songModels.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedSong) {
            return res.status(404).json({
                success: false,
                message: "Song not found"
            });
        }

        res.status(200).json({
            success: true,
            song: updatedSong,
            message: "Song updated successfully"
        });

    } catch (error) {
        console.error('Error in updateSong:', error);
        res.status(500).json({
            success: false,
            message: "Error updating song",
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

        // Find the song first to get the Cloudinary URLs
        const song = await songModels.findById(id);
        
        if (!song) {
            return res.status(404).json({
                success: false,
                message: "Song not found"
            });
        }

        // Extract public IDs from URLs
        const getPublicId = (url) => {
            const splits = url.split('/');
            const filename = splits[splits.length - 1];
            const publicId = `spotify/${splits[splits.length - 2]}/${filename.split('.')[0]}`;
            return publicId;
        };

        // Delete files from Cloudinary
        try {
            if (song.file) {
                await cloudinary.uploader.destroy(getPublicId(song.file), { resource_type: "video" });
            }
            if (song.image) {
                await cloudinary.uploader.destroy(getPublicId(song.image));
            }
        } catch (cloudinaryError) {
            console.error('Error deleting from Cloudinary:', cloudinaryError);
        }

        // Delete song from database
        await songModels.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Song deleted successfully"
        });

    } catch (error) {
        console.error('Error in removeSong:', error);
        res.status(500).json({
            success: false,
            message: "Error deleting song",
            error: error.message
        });
    }
};