import React,{useContext} from  "react";
import {PlayerContext} from "./PlayerContext";


const SongItem=({name,image,des,id})=>{
    const  {playWithId}=useContext(PlayerContext);
    return(
        <div onClick={()=>playWithId} className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
            <img className="rounded" src={image}/>
            <p className="font-bold mt-2 mb-1">{name}</p>
            <p className="text-slate-200 text-sm ">{des}</p>
            <p className="text-slate-200 text-sm ">{id}</p>

        </div>
    )
}
export default SongItem;