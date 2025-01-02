const API_BASE_URL = 'https://spotify-full-stack-clone.onrender.com';

export const endpoints = {
    // Songs
    getAllSongs: `${API_BASE_URL}/api/song/all`,
    addSong: `${API_BASE_URL}/api/song/add`,
    updateSong: `${API_BASE_URL}/api/song/update`,
    
    // Albums
    getAllAlbums: `${API_BASE_URL}/api/album/all`,
    addAlbum: `${API_BASE_URL}/api/album/add`,
    getAlbumById: (id) => `${API_BASE_URL}/api/album/${id}`,
    
    // Song Operations
    getSongById: (id) => `${API_BASE_URL}/api/song/${id}`,
    deleteSong: (id) => `${API_BASE_URL}/api/song/delete/${id}`,
};

export default API_BASE_URL;
