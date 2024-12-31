import React, { useState } from 'react';
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from 'react-toastify';
import { url } from '../App';

export const AddSong = () => {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [songName, setSongName] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation to ensure all fields are filled
    if (!song || !image || !songName || !songDescription) {
      toast.error("All fields are required, including song and image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", songName);
      formData.append("des", songDescription);
      formData.append("image", image);
      formData.append("audio", song);

      // Debug log
      console.log("Sending form data with:");
      console.log("- Song name:", songName);
      console.log("- Description:", songDescription);
      console.log("- Image file:", image.name);
      console.log("- Audio file:", song.name);

      const response = await axios.post(`${url}/api/song/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Song Added Successfully");
        // Reset form
        setSongName("");
        setSongDescription("");
        setImage(null);
        setSong(null);
        
        // Reset file input fields
        const songInput = document.getElementById('song');
        const imageInput = document.getElementById('image');
        if (songInput) songInput.value = '';
        if (imageInput) imageInput.value = '';
      } else {
        toast.error(response.data.message || "Failed to add song");
      }
    } catch (error) {
      console.error("Upload error:", error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to upload song. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
      {/* Song File */}
      <div className="flex gap-8">
        <div className="flex flex-col gap-2">
          <p>Upload Song</p>
          <input
            onChange={(e) => {
              console.log("Selected song file:", e.target.files[0]);
              setSong(e.target.files[0]);
            }}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              className="w-24 cursor-pointer"
              alt="upload songs"
            />
          </label>
        </div>
      </div>

      {/* Image File */}
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => {
            console.log("Selected image file:", e.target.files[0]);
            setImage(e.target.files[0]);
          }}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            className="w-24 cursor-pointer"
            alt="upload image"
          />
        </label>
      </div>

      {/* Song Name */}
      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
        <input
          onChange={(e) => {
            console.log("Song name updated:", e.target.value);
            setSongName(e.target.value);
          }}
          value={songName}
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
        />
      </div>

      {/* Song Description */}
      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          onChange={(e) => {
            console.log("Song description updated:", e.target.value);
            setSongDescription(e.target.value);
          }}
          value={songDescription}
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddSong;