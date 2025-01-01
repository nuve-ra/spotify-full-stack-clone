import axios from 'axios';
import { endpoints } from '../config/api';

const musicService = {
    // Get all songs
    getAllSongs: async () => {
        try {
            const response = await axios.get(endpoints.songs);
            return response.data;
        } catch (error) {
            console.error('Error fetching songs:', error);
            throw error;
        }
    },

    // Add song to favorites
    addToFavorites: async (songId) => {
        try {
            const response = await axios.post(`${endpoints.favorites}/${songId}`);
            return response.data;
        } catch (error) {
            console.error('Error adding to favorites:', error);
            throw error;
        }
    },

    // Get user playlists
    getUserPlaylists: async () => {
        try {
            const response = await axios.get(endpoints.playlists);
            return response.data;
        } catch (error) {
            console.error('Error fetching playlists:', error);
            throw error;
        }
    },

    // Create a new playlist
    createPlaylist: async (playlistData) => {
        try {
            const response = await axios.post(endpoints.playlists, playlistData);
            return response.data;
        } catch (error) {
            console.error('Error creating playlist:', error);
            throw error;
        }
    }
};

export default musicService;
