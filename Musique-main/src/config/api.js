const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const endpoints = {
    // Songs
    songsList: `${API_BASE_URL}/api/song/list`,
    addSong: `${API_BASE_URL}/api/song/add`,
    
    // Albums
    albumsList: `${API_BASE_URL}/api/album/list`,
    addAlbum: `${API_BASE_URL}/api/album/add`,
    getAlbumById: (id) => `${API_BASE_URL}/api/album/${id}`,
    
    // Song Operations
    getSongById: (id) => `${API_BASE_URL}/api/song/${id}`,
    updateSong: (id) => `${API_BASE_URL}/api/song/update/${id}`,
    deleteSong: (id) => `${API_BASE_URL}/api/song/delete/${id}`,
};

export default API_BASE_URL;
