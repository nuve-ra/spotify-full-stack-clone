import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';
const TARGET_ALBUM_ID = '677474181e216b912f7a5a6f';

async function updateSongs() {
    try {
        // Get all songs
        console.log('Fetching songs...');
        const songsResponse = await axios.get(`${API_BASE_URL}/api/song/list`);
        
        if (!songsResponse.data.success) {
            console.error('Failed to fetch songs:', songsResponse.data.message);
            return;
        }
        
        const songs = songsResponse.data.songs;
        console.log(`Found ${songs.length} songs`);

        // Find songs with "Single" as album and update them
        for (const song of songs) {
            console.log(`Checking song: ${song.title || song.name} (Album: ${song.album})`);
            
            if (song.album === "Single") {
                console.log(`Updating song: ${song.title || song.name}`);
                
                try {
                    // Keep all existing song data and only update the album
                    const updateData = {
                        title: song.title || song.name,
                        artist: song.artist || "Unknown Artist",
                        album: TARGET_ALBUM_ID,
                        duration: song.duration,
                        image: song.image,
                        file: song.file,
                        des: song.des || "song"
                    };

                    const response = await axios.put(`${API_BASE_URL}/api/song/update/${song._id}`, updateData);
                    
                    if (response.data.success) {
                        console.log(`✓ Successfully updated song: ${song.title || song.name}`);
                    } else {
                        console.log(`✗ Failed to update song: ${song.title || song.name}`);
                    }
                } catch (error) {
                    console.error(`✗ Error updating song ${song.title || song.name}:`, error.response?.data?.message || error.message);
                    if (error.response?.data) {
                        console.error('Server response:', error.response.data);
                    }
                }
            } else {
                console.log(`Skipping song: ${song.title || song.name} (already has album: ${song.album})`);
            }
        }

        console.log('Finished updating songs');
    } catch (error) {
        console.error('Error:', error.response?.data?.message || error.message);
        if (error.response?.data) {
            console.error('Server response:', error.response.data);
        }
    }
}

updateSongs();
