import React, { useContext } from "react";
import { assets } from "./assets/frontend-assets/assets"
import { PlayerContext } from "./PlayerContext";

const Player = () => {
    const { seekBg, seekBar, playStatus, play, pause, track, previous, next, seekSong, time } = useContext(PlayerContext);

    if (!track) return null;

    return track ? (
        <div className='h-20 fixed bottom-0 left-0 right-0 bg-black flex items-center justify-between text-white px-4 border-t border-gray-800'>
            <div className="flex items-center gap-4 w-1/4">
                <img className="w-12 h-12 object-cover" src={track.image} alt="" />
                <div>
                    <p className="text-sm font-medium">{track.name}</p>
                    <p className="text-xs text-gray-400">{track.desc ? track.desc.slice(0, 30) : ''}</p>
                </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 w-2/4">
                <div className="flex gap-6 items-center">
                    <img className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" src={assets.shuffle_icon} alt="" />
                    <img onClick={previous} className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" src={assets.prev_icon} alt="" />
                    {
                        playStatus ? 
                            <img onClick={pause} className="w-8 h-8 cursor-pointer" src={assets.pause_icon} alt="" />
                            : <img onClick={play} className="w-8 h-8 cursor-pointer" src={assets.play_icon} alt="" />
                    }
                    <img onClick={next} className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" src={assets.next_icon} alt="" />
                    <img className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" src={assets.loop_icon} alt="" />
                </div>
                <div className="flex items-center gap-2 w-full max-w-[600px]">
                    <p className="text-xs w-10 text-right">{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div ref={seekBg} onClick={seekSong} className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer">
                        <hr ref={seekBar} className="h-1 border-none w-0 bg-green-500 rounded-full" />
                    </div>
                    <p className="text-xs w-10">{time.totalTime.minute}:{time.totalTime.second}</p>
                </div>
            </div>

            <div className='hidden lg:flex items-center gap-3 w-1/4 justify-end'>
                <img className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" src={assets.plays_icon} alt="" />
                <img className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" src={assets.mic_icon} alt="" />
                <img className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" src={assets.queue_icon} alt="" />
                <img className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" src={assets.volume_icon} alt="" />
                <div className="w-24 bg-gray-600 h-1 rounded-full cursor-pointer">
                    <div className="w-1/2 bg-white h-1 rounded-full"></div>
                </div>
            </div>
        </div>
    ) : null;
}
export default Player;