import React from "react";
import Navbar from "./navbar";
import AlbumItem from "./albumitem.jsx";
import SongItem from "./songitem.jsx";
import { useContext } from "react";
import { PlayerContext } from "./PlayerContext.jsx";

const DisplayHome = () => {
    const { songsData, albumsData, loading } = useContext(PlayerContext);

    return (
        <>
            <Navbar />
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Featured</h1>
            </div>
            <div className="flex overflow-auto">
                {loading ? (
                    <div className="text-white">Loading albums...</div>
                ) : albumsData && albumsData.length > 0 ? (
                    albumsData.map((item, index) => (
                        <AlbumItem
                            key={index}
                            name={item.name}
                            des={item.des}
                            id={item._id}
                            image={item.image}
                        />
                    ))
                ) : (
                    <div className="text-white">No albums available</div>
                )}
            </div>

            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Today's Biggest hits</h1>
            </div>
            <div className="flex overflow-auto">
                {loading ? (
                    <div className="text-white">Loading songs...</div>
                ) : songsData && songsData.length > 0 ? (
                    songsData.map((item, index) => (
                        <SongItem
                            key={index}
                            name={item.name}
                            des={item.des}
                            id={item._id}
                            image={item.image}
                        />
                    ))
                ) : (
                    <div className="text-white">No songs available</div>
                )}
            </div>
        </>
    );
};

export default DisplayHome;