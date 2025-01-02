import { createContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { endpoints } from '../config/api';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [lastFetchAttempt, setLastFetchAttempt] = useState(0);
    const [time, setTime] = useState({
        currentTime: {
            minute: 0,
            second: 0
        },
        totalTime: {
            minute: 0,
            second: 0
        }
    });

    const play = async () => {
        if (track) {
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)
    }

    const playWithId = async (id) => {
        const songToPlay = songsData.find(item => item._id === id);
        if (songToPlay) {
            setTrack(songToPlay);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const previous = async () => {
        const currentIndex = songsData.findIndex(item => track?._id === item._id);
        if (currentIndex > 0) {
            setTrack(songsData[currentIndex - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const next = async () => {
        const currentIndex = songsData.findIndex(item => track?._id === item._id);
        if (currentIndex < songsData.length - 1) {
            setTrack(songsData[currentIndex + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const seekSong = (e) => {
        audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    }

    const getSongsData = async () => {
        try {
            // Prevent multiple rapid requests
            const now = Date.now();
            if (now - lastFetchAttempt < 5000) { // 5 seconds cooldown
                return;
            }
            setLastFetchAttempt(now);
            
            setLoading(true);
            console.log('Fetching songs from:', endpoints.songsList);
            const response = await axios.get(endpoints.songsList);
            console.log('Songs response:', response.data);
            
            if (response.data?.success && Array.isArray(response.data.songs)) {
                // Log each song's album ID to help with debugging
                response.data.songs.forEach(song => {
                    console.log(`Song: ${song.name}, Album ID: ${song.album}`);
                });
                setSongsData(response.data.songs);
                if (response.data.songs.length > 0 && !track) {
                    setTrack(response.data.songs[0]);
                }
            } else {
                console.error('Invalid response format:', response.data);
                toast.error("Invalid response format from server");
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
            if (error.code === 'ECONNRESET') {
                toast.error("Connection lost. Retrying...");
                // Retry after 5 seconds
                setTimeout(getSongsData, 5000);
            } else {
                toast.error(error.response?.data?.message || "Error loading songs");
            }
        } finally {
            setLoading(false);
        }
    };

    const getAlbumsData = async () => {
        try {
            // Prevent multiple rapid requests
            const now = Date.now();
            if (now - lastFetchAttempt < 5000) { // 5 seconds cooldown
                return;
            }
            setLastFetchAttempt(now);
            
            setLoading(true);
            console.log('Fetching albums from:', endpoints.albumsList);
            const response = await axios.get(endpoints.albumsList);
            console.log('Albums response:', response.data);
            
            if (response.data?.success && Array.isArray(response.data.albums)) {
                // Log each album's ID to help with debugging
                response.data.albums.forEach(album => {
                    console.log(`Album: ${album.name}, ID: ${album._id}`);
                });
                setAlbumsData(response.data.albums);
            } else {
                console.error('Invalid album response format:', response.data);
                toast.error("Invalid album response format from server");
            }
        } catch (error) {
            console.error("Error fetching albums:", error);
            if (error.code === 'ECONNRESET') {
                toast.error("Connection lost. Retrying...");
                // Retry after 5 seconds
                setTimeout(getAlbumsData, 5000);
            } else {
                toast.error(error.response?.data?.message || "Error loading albums");
            }
        } finally {
            setLoading(false);
        }
    }

    // Handle audio time updates
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                const totalMinute = Math.floor(audioRef.current.duration / 60);
                const totalSecond = Math.floor(audioRef.current.duration % 60);
                const currentMinute = Math.floor(audioRef.current.currentTime / 60);
                const currentSecond = Math.floor(audioRef.current.currentTime % 60);

                if (seekBar.current) {
                    const progressWidth = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                    seekBar.current.style.width = progressWidth + "%";
                }

                setTime({
                    currentTime: { minute: currentMinute, second: currentSecond },
                    totalTime: { minute: totalMinute, second: totalSecond }
                })
            }
        }
    }, [audioRef.current]);

    // Fetch initial data
    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    // Refresh data periodically (every 2 minutes instead of 30 seconds)
    useEffect(() => {
        const refreshInterval = setInterval(() => {
            getSongsData();
            getAlbumsData();
        }, 120000); // Refresh every 2 minutes

        return () => clearInterval(refreshInterval);
    }, []);

    return (
        <PlayerContext.Provider value={{
            audioRef,
            seekBg,
            seekBar,
            songsData,
            albumsData,
            track,
            playStatus,
            time,
            loading,
            play,
            pause,
            playWithId,
            previous,
            next,
            seekSong,
            getSongsData,
            getAlbumsData
        }}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;