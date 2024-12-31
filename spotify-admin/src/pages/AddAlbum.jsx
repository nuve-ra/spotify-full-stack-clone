import React, { useState } from 'react';
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from 'react-toastify';
import { url } from '../App';
import { ChromePicker } from 'react-color';

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [loading, setLoading] = useState(false);

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
        setBgColor("#ffffff");
        
        // Reset file input
        const imageInput = document.getElementById('image');
        if (imageInput) imageInput.value = '';
      } else {
        toast.error(response.data.message || "Failed to add album");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to add album");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-gray-400 border-t-green-600 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600 p-6">
      <h2 className="text-2xl font-bold text-gray-800">Add New Album</h2>

      {/* Image Upload */}
      <div className="flex flex-col gap-4">
        <p>Album Cover</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            className="w-32 h-32 object-cover cursor-pointer rounded-lg border-2 border-gray-300"
            alt="upload cover"
          />
        </label>
      </div>

      {/* Album Name */}
      <div className="flex flex-col gap-2.5 w-full max-w-md">
        <p>Album Name</p>
        <input
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 rounded-md"
          placeholder="Enter album name"
        />
      </div>

      {/* Album Description */}
      <div className="flex flex-col gap-2.5 w-full max-w-md">
        <p>Album Description</p>
        <textarea
          value={albumDescription}
          onChange={(e) => setAlbumDescription(e.target.value)}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 rounded-md min-h-[100px]"
          placeholder="Enter album description"
        />
      </div>

      {/* Background Color */}
      <div className="flex flex-col gap-2.5">
        <p>Background Color</p>
        <div className="relative">
          <div
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="w-10 h-10 rounded-md cursor-pointer border-2 border-gray-300"
            style={{ backgroundColor: bgColor }}
          />
          {showColorPicker && (
            <div className="absolute z-10 mt-2">
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
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-6 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
      >
        Add Album
      </button>
    </form>
  );
};

export default AddAlbum;