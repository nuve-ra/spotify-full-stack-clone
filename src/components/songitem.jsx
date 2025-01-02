import React, { useContext } from "react";
import { PlayerContext } from "./PlayerContext";

const SongItem = ({ name, image, des, id }) => {
    const { playWithId } = useContext(PlayerContext);
    
    return (
        <div 
            onClick={() => playWithId(id)}
            className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all duration-300 cursor-pointer group min-w-[200px] max-w-[200px] mx-2 flex-shrink-0"
        >
            <div className="relative">
                <img 
                    className="w-[180px] h-[180px] object-cover rounded shadow-xl mb-4" 
                    src={image}
                    alt={name}
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        className="w-12 h-12 rounded-full bg-[#1ed760] flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
                        onClick={(e) => {
                            e.stopPropagation();
                            playWithId(id);
                        }}
                    >
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <h3 className="text-white font-bold mb-2">{name}</h3>
            <p className="text-[#B3B3B3] text-sm leading-tight">{des}</p>
        </div>
    );
};

export default SongItem;