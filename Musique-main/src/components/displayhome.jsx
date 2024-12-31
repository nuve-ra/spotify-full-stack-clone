import React from "react";
import Navbar from "./navbar";
import { albumsData } from "./assets/frontend-assets/assets";
import AlbumItem from "./albumitem.jsx";
import { songsData } from "./assets/frontend-assets/assets";
import SongItem from "./songitem.jsx";

const DisplayHome=()=>{
    return(
        <>
        <Navbar/>
        <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl ">Featured</h1>
        </div>
        <div className="flex overflow-auto">

        
        {
            albumsData.map((item,index)=>(<AlbumItem key={index} name={item.name} des={item.des} id={item.id} image={item.image}/>))
            } 

        <div className="my-5 font-bold text-2xl">
        </div>
        </div>
        <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl ">Today's Biggest hits</h1>
        </div>
        <div className="flex overflow-auto">

        
        {
            songsData.map((item,index)=>(<SongItem key={index} name={item.name} des={item.des} id={item.id} image={item.image}/>))
            } 

        <div className="my-5 font-bold text-2xl">
        </div>
        </div>
      
        </>

    )
}
export default DisplayHome;