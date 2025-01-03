const API_BASE_URL = 'https://spotify-backend-jbda.onrender.com';

export const endpoints = {
    // Album Endpoints
    addAlbum: `${API_BASE_URL}/api/album/add`, // Add a new album
    albumsList: `${API_BASE_URL}/api/album/list`, // Fetch all albums
    albumSongs: (albumId) => `${API_BASE_URL}/api/album/${albumId}/songs`, // Fetch songs for a specific album

    // Song Endpoints
    songsList: `${API_BASE_URL}/api/song/list`, // Fetch all songs
};

export default API_BASE_URL;
