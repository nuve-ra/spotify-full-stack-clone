import React, { useEffect, useRef, useContext } from "react";
import DisplayHome from "./displayhome.jsx";
import {Routes, Route, useLocation} from 'react-router-dom';
import DisplayAlbum from "./displayalbum.jsx";
import { PlayerContext } from "./PlayerContext.jsx";

const Display=()=>{
    const displayRef=useRef();
    const location=useLocation();
    const { albumsData } = useContext(PlayerContext);
    const isAlbum=location.pathname.includes("album");
    const albumId=isAlbum ? location.pathname.split('/').pop(): "";
    const bgColor = isAlbum && albumsData.length > 0 ? albumsData.find((x) =>( x._id == albumId))?.bgColor : "#121212";
    
    useEffect(()=>{
        if(isAlbum && displayRef.current){
            displayRef.current.style.background=`linear-gradient(${bgColor},#121212)`
        }else if(displayRef.current){
            displayRef.current.style.background='#121212'
        }
    },[isAlbum, bgColor])

    return(
        <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"> 
            <Routes>
                <Route path="/" element={<DisplayHome/>}/>
                <Route path="/album/:id" element={<DisplayAlbum album={albumsData.find((x) =>( x._id == albumId))}/>}/>
            </Routes>
        </div>
    )
}
export default Display;