import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { url } from '../App';
import { FaImage } from 'react-icons/fa';
import { IoColorPaletteSharp } from 'react-icons/io5';

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [bgColor, setBgColor] = useState("#1F1F1F");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image || !albumName || !albumDescription) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", albumName);
      formData.append("des", albumDescription);
      formData.append("image", image);
      formData.append("bgColor", bgColor);

      const response = await axios.post(`${url}/api/album/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Album Added Successfully");
        // Reset form
        setAlbumName("");
        setAlbumDescription("");
        setImage(null);
        setBgColor("#1F1F1F");
        setPreviewImage(null);
      } else {
        toast.error(response.data.message || "Failed to add album");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to add album");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F1F1F] to-black text-white p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Add New Album</h2>
      <form onSubmit={onSubmitHandler} className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Album Name</label>
          <input
            type="text"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            className="bg-[#2A2A2A] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter album name"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg">Description</label>
          <textarea
            value={albumDescription}
            onChange={(e) => setAlbumDescription(e.target.value)}
            className="bg-[#2A2A2A] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
            placeholder="Enter album description"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center space-y-4">
            <label className="w-full text-center p-4 bg-[#2A2A2A] rounded-lg cursor-pointer hover:bg-[#3A3A3A] transition-colors">
              <div className="flex flex-col items-center space-y-2">
                <FaImage className="text-4xl text-green-500" />
                <span>Upload Album Cover</span>
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
            <div 
              className="w-full text-center p-4 bg-[#2A2A2A] rounded-lg cursor-pointer hover:bg-[#3A3A3A] transition-colors"
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <div className="flex flex-col items-center space-y-2">
                <IoColorPaletteSharp className="text-4xl text-green-500" />
                <span>Choose Background Color</span>
              </div>
            </div>
            {showColorPicker && (
              <div className="absolute mt-2 z-10">
                <div 
                  className="fixed inset-0" 
                  onClick={() => setShowColorPicker(false)}
                />
                <ChromePicker
                  color={bgColor}
                  onChange={(color) => setBgColor(color.hex)}
                />
              </div>
            )}
            <div 
              className="w-8 h-8 rounded-full border-2 border-white"
              style={{ backgroundColor: bgColor }}
            />
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
          {loading ? "Adding Album..." : "Add Album"}
        </button>
      </form>
    </div>
  );
};

export default AddAlbum;