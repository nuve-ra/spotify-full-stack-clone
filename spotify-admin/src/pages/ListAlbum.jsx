import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { FaTrash } from 'react-icons/fa';

const ListAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/all`);
      if (response.data.success) {
        setAlbums(response.data.albums);
      } else {
        toast.error("Failed to fetch albums");
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
      toast.error("Error loading albums");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (albumId) => {
    if (!window.confirm("Are you sure you want to delete this album?")) {
      return;
    }

    try {
      const response = await axios.delete(`${url}/api/album/delete/${albumId}`);
      if (response.data.success) {
        toast.success("Album deleted successfully");
        fetchAlbums(); // Refresh the list
      } else {
        toast.error(response.data.message || "Failed to delete album");
      }
    } catch (error) {
      console.error("Error deleting album:", error);
      toast.error("Error deleting album");
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Albums</h2>
      
      {albums.length === 0 ? (
        <p className="text-gray-600">No albums found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div 
              key={album._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              style={{ backgroundColor: album.bgColor || '#ffffff' }}
            >
              <div className="relative">
                <img 
                  src={album.image} 
                  alt={album.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleDelete(album._id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{album.name}</h3>
                <p className="text-gray-600 text-sm">{album.des}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListAlbum;