import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar.jsx";
import Player from "./components/player.jsx";
import Display from "./components/display.jsx";
import { PlayerContext } from "./components/PlayerContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/scrollbar.css';

const App = () => {
    const { audioRef, track, songsData } = useContext(PlayerContext)
    return (
        <div className="h-screen bg-black">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="h-full pb-20 flex">
                <Sidebar />
                <Routes>
                    <Route path="/*" element={<Display />} />
                </Routes>
            </div>
            {songsData.length > 0 && <Player />}
            {track && <audio ref={audioRef} src={track ? track.file : ""} preload="auto"></audio>}
        </div>
    )
}
export default App;