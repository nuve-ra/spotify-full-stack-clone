import React, { useContext } from "react";
import { PlayerContext } from '../context/PlayerContext';
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { FaTrash } from 'react-icons/fa';

const ListAlbum = () => {
  const { albums, getAlbumsData } = useContext(PlayerContext);

  const handleDelete = async (albumId) => {
    if (!window.confirm("Are you sure you want to delete this album?")) {
      return;
    }

    try {
      const response = await axios.delete(`${url}/api/album/delete/${albumId}`);
      if (response.data.success) {
        toast.success("Album deleted successfully");
        getAlbumsData(); // Refresh the list
      } else {
        toast.error(response.data.message || "Failed to delete album");
      }
    } catch (error) {
      console.error("Error deleting album:", error);
      toast.error("Error deleting album");
    }
  };

  if (!albums || albums.length === 0) {
    return <div className="text-center mt-8">No albums available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Albums</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((album) => (
          <div key={album._id} className="bg-white rounded-lg shadow-md p-4">
            <img src={album.imageUrl} alt={album.name} className="w-full h-48 object-cover rounded-md mb-2" />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{album.name}</h3>
                <p className="text-gray-600">{album.des}</p>
              </div>
              <button
                onClick={() => handleDelete(album._id)}
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;