import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem=({image,des,name,id})=>{
    const Navigate=useNavigate();
    return(
        <div onClick={()=>Navigate(`/album/${id}`)} className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
            <img className="rounded" src={image}/>
            <p className="font-bold mt-2 mb-1">{name}</p>
            <p className="text-slate-200 text-sm ">{des}</p>

        </div>
    )
}
export default AlbumItem;