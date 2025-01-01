const API_BASE_URL = 'http://localhost:5173';

export const endpoints = {
    // Add your API endpoints here
    songs: `${API_BASE_URL}/api/songs`,
    playlists: `${API_BASE_URL}/api/playlists`,
    favorites: `${API_BASE_URL}/api/favorites`,
    // Add more endpoints as needed
};

export default API_BASE_URL;
