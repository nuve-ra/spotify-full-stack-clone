import React from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddAlbum from './pages/AddAlbum';
import ListSong from './pages/ListSong';
import ListAlbum from './pages/ListAlbum';
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import AddSong from './pages/AddSong';
import { PlayerProvider } from './context/PlayerContext';

// Backend API URL - Production
export const url = 'https://spotify-backend-jbda.onrender.com/';

function App() {
  return (
    <Router>
      <PlayerProvider>
        <div className="w-full min-h-screen flex flex-col bg-primary">
          <div className="flex items-start min-h-screen">
            <ToastContainer />
            <SideBar/>
            <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
              <NavBar/>
              <div className="pt-18 pl-5 sm:pt-12 sm:pl-12">
                <Routes>
                  <Route path="/add-song" element={<AddSong />} />
                  <Route path="/add-album" element={<AddAlbum />} />
                  <Route path="/list-song" element={<ListSong />} />
                  <Route path="/list-album" element={<ListAlbum />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </PlayerProvider>
    </Router>
  );
}

export default App;
