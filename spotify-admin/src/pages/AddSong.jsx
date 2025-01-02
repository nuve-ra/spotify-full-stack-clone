import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../App";
import { useNavigate } from "react-router-dom";
import { FaImage, FaMusic } from 'react-icons/fa'; // Import icons

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [songName, setSongName] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [album, setAlbum] = useState(""); 
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`${url}/api/album/all`);
        if (response.data.success) {
          setAlbums(response.data.albums);
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
        toast.error("Failed to load albums");
      }
    };

    fetchAlbums();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSongChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSong(file);
      toast.success("Song file selected: " + file.name);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!song || !image || !songName || !songDescription || !album) {
      toast.error("All fields are required, including album, song and image.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", songName);
      formData.append("des", songDescription);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);
      
      console.log('Adding song with album:', album); // Debug log

      const response = await axios.post(`${url}/api/song/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Song added successfully!");
        // Reset form
        setSongName("");
        setSongDescription("");
        setImage(null);
        setSong(null);
        setAlbum("");
        setPreviewImage(null);
      }
    } catch (error) {
      console.error("Error adding song:", error);
      toast.error("Failed to add song. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F1F1F] to-black text-white p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Add New Song</h2>
      <form onSubmit={onSubmitHandler} className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Song Name</label>
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            className="bg-[#2A2A2A] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter song name"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg">Description</label>
          <textarea
            value={songDescription}
            onChange={(e) => setSongDescription(e.target.value)}
            className="bg-[#2A2A2A] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
            placeholder="Enter song description"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg">Album</label>
          <select
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="bg-[#2A2A2A] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select an album</option>
            {albums.map((album) => (
              <option key={album._id} value={album._id}>
                {album.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center space-y-4">
            <label className="w-full text-center p-4 bg-[#2A2A2A] rounded-lg cursor-pointer hover:bg-[#3A3A3A] transition-colors">
              <div className="flex flex-col items-center space-y-2">
                <FaImage className="text-4xl text-green-500" />
                <span>Upload Image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {previewImage && (
              <div className="w-32 h-32 relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <label className="w-full text-center p-4 bg-[#2A2A2A] rounded-lg cursor-pointer hover:bg-[#3A3A3A] transition-colors">
              <div className="flex flex-col items-center space-y-2">
                <FaMusic className="text-4xl text-green-500" />
                <span>Upload Song</span>
              </div>
              <input
                type="file"
                accept="audio/*"
                onChange={handleSongChange}
                className="hidden"
              />
            </label>
            {song && (
              <div className="text-sm text-green-500">
                Selected: {song.name}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-4 rounded-lg font-bold ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } transition-colors`}
        >
          {loading ? "Adding Song..." : "Add Song"}
        </button>
      </form>
    </div>
  );
};

export default AddSong;
