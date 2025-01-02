import React from "react";
import { assets } from "./assets/frontend-assets/assets";
import { useNavigate } from "react-router-dom";
 
const Navbar=()=>{
    const navigate = useNavigate();
    
    const handleAdminRedirect = () => {
        // Open admin panel in a new tab
        window.open('http://localhost:5143', '_blank');
    };

    return(
        <>
        <div className="w-full flex flex-row justify-between items-center font-semibold ">
            <div className="flex items-center gap-2">
                <img onClick={()=>navigate(-1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_left}/>
                <img onClick={()=>navigate(1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_right}/>
            </div>
            <div className="flex items-center gap-4">
                <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block">Explore Premium</p>
                <p className="bg-black px-3 py-1 rounded-2xl text-[15px] cursor-pointer">Install App</p>
                <p onClick={handleAdminRedirect} className="bg-purple-500 text-black h-7 w-7 py-1 rounded-full text-[15px] flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors">N</p>
            </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
            <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-point">All</p>
            <p className="bg-black px-4 py-1 rounded-2xl cursor-point">Music</p>
            <p className="bg-black px-4 py-1 rounded-2xl cursor-point">Podcasts</p>
        </div>
        </>
    )
}
export default Navbar;