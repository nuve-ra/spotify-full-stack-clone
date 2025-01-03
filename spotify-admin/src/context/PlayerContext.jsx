import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// API URL configuration
const API_URL = 'https://spotify-backend-jbda.onrender.com/';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getSongsData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Make a direct API call to the songs endpoint
      const response = await axios.get(`${API_URL}/api/song/list`);
      console.log('Songs API Response:', response.data);
      
      if (response.data.success) {
        setSongs(response.data.songs || []);
      } else {
        setError(response.data.message || 'Failed to fetch songs');
      }
    } catch (error) {
      console.error('Error fetching songs:', {
        message: error.message,
        response: error.response?.data
      });
      setError('Failed to fetch songs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getAlbumsData = async () => {
    try {
      // Make a direct API call to the albums endpoint
      const response = await axios.get(`${API_URL}/api/album/list`);
      console.log('Albums API Response:', response.data);
      
      if (response.data.success) {
        setAlbums(response.data.albums || []);
      }
    } catch (error) {
      console.error('Error fetching albums:', {
        message: error.message,
        response: error.response?.data
      });
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    console.log('Fetching initial data...');
    getSongsData();
    getAlbumsData();
  }, []);

  // Handle audio playback
  useEffect(() => {
    if (currentSong) {
      audio.src = currentSong.file;
      if (isPlaying) {
        audio.play().catch(e => {
          console.error('Error playing audio:', e);
          setIsPlaying(false);
        });
      }
    }
    return () => {
      audio.pause();
    };
  }, [currentSong, isPlaying]);

  const playSong = (song) => {
    if (!song.file) {
      console.error('No audio file available for song:', song);
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
    audio.pause();
  };

  const value = {
    songs,
    albums,
    currentSong,
    isPlaying,
    loading,
    error,
    playSong,
    pauseSong,
    getSongsData,
    getAlbumsData
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};
