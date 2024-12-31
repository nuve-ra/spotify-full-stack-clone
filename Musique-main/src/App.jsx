import React, { useContext } from "react";
import Sidebar from "./components/sidebar.jsx";
import Player from "./components/player.jsx";
import Display from "./components/display.jsx";
import { PlayerContext } from "./components/PlayerContext.jsx";
const App=()=>{
    const {audioRef,track} = useContext(PlayerContext)
    return(
        <div className="h-screen bg-black">
            <div className="h-[90%] flex">
                <Sidebar/>
                <Display/>
                
            </div>
            <Player/>
            <audio ref={audioRef} src={track.file} preload="auto"></audio>
        </div>
       
        
        )
}
export default App;