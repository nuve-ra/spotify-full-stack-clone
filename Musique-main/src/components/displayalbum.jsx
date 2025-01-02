import React, { useContext, useState, useEffect } from 'react';
import Navbar from "./navbar";
import {useParams} from "react-router-dom";
import { assets } from './assets/frontend-assets/assets';
import { PlayerContext } from './PlayerContext';

export const DisplayAlbum = () => {
    const {id} = useParams();
    const [albumData,setAlbumData]=useState(null);
    const {playWithId, albumsData, songsData}=useContext(PlayerContext);

    useEffect(()=>{
      console.log("Current Album ID from URL:", id);
      console.log("All Albums Data:", albumsData);
      console.log("All Songs Data:", songsData);
      
      const currentAlbum = albumsData.find((item) => {
        console.log("Comparing album ID:", item._id, "with current ID:", id);
        return item._id === id;
      });

      if (currentAlbum) {
        console.log("Found Album:", currentAlbum);
        setAlbumData(currentAlbum);
      } else {
        console.log("Album not found!");
      }
    },[albumsData, id])

  return albumData ? (
    <>
    <div>
        <Navbar/>
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
            <img className="w-48 rounded" src={albumData.image}/>
            <div className="flex flex-col">
              <p>Playlist</p>
              <h2 className="text-5xl font-bold mb-4 md:text--7xl">{albumData.name}</h2>
              <h4>{albumData.des}</h4>
              <p className="mt-1">
                <img  className="inline-block w-5" src={assets.spotify_logo}/>
                <b> Spotify </b>
                1,23,566 likes
                <b> 50 songs , </b>
                about 2 hr 30 minutes
              </p>
            </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
          <p><b className="mr-4">#</b>Title</p>
          <p>Album</p>
          <p className="hidden sm:block">Date Added</p>
          <img className="margin-auto w-4" src={assets.clock_icon} alt=""/>
        </div>
        <hr/>
        {songsData && albumData && (
          <>
            {console.log("Filtering songs for album:", albumData._id)}
            {songsData.map((song, index) => {
              console.log("Checking song:", song.name, "Album ID:", song.album);
              if (song.album === albumData._id) {
                return (
                  <div onClick={()=>playWithId(song._id)} key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"> 
                    <p className="text-white">
                      <b className="mr-4 text-color-[#a7a7a7]">{index+1}</b>
                      <img className="inline w-10 mr-5" src={song.image} alt="img"/>
                      {song.name}
                    </p>
                    <p className="text-[15px]">{albumData.name}</p>
                    <p className="text-[15px] hidden sm:block"> 5 days ago</p>
                    <p className="text-[15px] text-center">{song.duration}</p>
                  </div>
                );
              }
              return null;
            }).filter(Boolean)}
          </>
        )}
    </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default DisplayAlbum;