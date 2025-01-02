import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../App';
import { FaTrash, FaPlay, FaPause } from 'react-icons/fa';

const ListSong = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [audio] = useState(new Audio());

  useEffect(() => {
    fetchSongs();
    return () => {
      audio.pause();
    };
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/all`);
      if (response.data.success) {
        setSongs(response.data.songs);
      } else {
        toast.error("Failed to fetch songs");
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
      toast.error("Error loading songs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (songId) => {
    if (!window.confirm("Are you sure you want to delete this song?")) {
      return;
    }

    try {
      const response = await axios.delete(`${url}/api/song/delete/${songId}`);
      if (response.data.success) {
        toast.success("Song deleted successfully");
        fetchSongs(); // Refresh the list
      } else {
        toast.error(response.data.message || "Failed to delete song");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
      toast.error("Error deleting song");
    }
  };

  const togglePlay = (song) => {
    if (currentlyPlaying === song._id) {
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      if (currentlyPlaying) {
        audio.pause();
      }
      audio.src = song.file;
      audio.play();
      setCurrentlyPlaying(song._id);

      audio.onended = () => {
        setCurrentlyPlaying(null);
      };
    }
  };

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 border-4 border-gray-400 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Songs</h2>
      
      {songs.length === 0 ? (
        <p className="text-gray-600">No songs found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song) => (
            <div 
              key={song._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={song.image} 
                  alt={song.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => togglePlay(song)}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                  >
                    {currentlyPlaying === song._id ? <FaPause /> : <FaPlay />}
                  </button>
                  <button
                    onClick={() => handleDelete(song._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{song.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{song.des}</p>
                <p className="text-gray-500 text-xs">Duration: {song.duration}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListSong;