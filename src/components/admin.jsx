import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { endpoints } from '../config/api';
import Navbar from './navbar';
import { PlayerContext } from './PlayerContext';

const Admin = () => {
    const { albumsData } = useContext(PlayerContext);
    const [songData, setSongData] = useState({
        name: '',
        artist: '',
        album: '',
        duration: '',
        file: null,
        image: null
    });

    const handleInputChange = (e) => {
        setSongData({
            ...songData,
            [e.target.name]: e.target.name === 'file' || e.target.name === 'image' 
                ? e.target.files[0] 
                : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            Object.keys(songData).forEach(key => {
                formData.append(key, songData[key]);
            });

            const response = await axios.post(endpoints.addSong, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data.success) {
                toast.success('Song added successfully!');
                setSongData({
                    name: '',
                    artist: '',
                    album: '',
                    duration: '',
                    file: null,
                    image: null
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding song');
        }
    };

    return (
        <div className="p-8 bg-[#121212] text-white h-full overflow-y-auto">
            <Navbar />
            <div className="max-w-2xl mx-auto mt-8">
                <h2 className="text-3xl font-bold mb-6">Add New Song</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2">Song Name</label>
                        <input
                            type="text"
                            name="name"
                            value={songData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded bg-[#282828] focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Artist</label>
                        <input
                            type="text"
                            name="artist"
                            value={songData.artist}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded bg-[#282828] focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Album</label>
                        <select
                            name="album"
                            value={songData.album}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded bg-[#282828] focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        >
                            <option value="">Select an album</option>
                            {albumsData.map((album) => (
                                <option key={album._id} value={album._id}>
                                    {album.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Duration (e.g., 3:45)</label>
                        <input
                            type="text"
                            name="duration"
                            value={songData.duration}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded bg-[#282828] focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Song File</label>
                        <input
                            type="file"
                            name="file"
                            onChange={handleInputChange}
                            className="w-full p-2 rounded bg-[#282828] focus:outline-none focus:ring-2 focus:ring-green-500"
                            accept="audio/*"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Cover Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleInputChange}
                            className="w-full p-2 rounded bg-[#282828] focus:outline-none focus:ring-2 focus:ring-green-500"
                            accept="image/*"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        Add Song
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Admin;
