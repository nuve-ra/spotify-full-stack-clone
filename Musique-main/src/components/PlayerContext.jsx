import { createContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef=useRef();
    const seekBg= useRef();
    const seekBar= useRef();

    const url="http://localhost:4000";
    
    const [songsData,setSongsData] = useState([]);
    const [albumsData,setAlbumsData] = useState([]);
    const [track,setTrack] = useState(null);
    const [playStatus,setPlayStatus]=useState(false);
    const [loading, setLoading] = useState(true);
    const [time,setTime]=useState({
        currentTime:{
            minute:0,
            second:0
        },
        totalTime:{
            minute:0,
            second:0
        }
    });

    const play = async ()=>{
        if (track) {
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const pause=()=>{
        audioRef.current.pause();
        setPlayStatus(false)
    }

    const playWithId = async (id)=>{
       await songsData.map((item)=>{
           if(item._id === id){
                setTrack(item);
           }
       })
       await audioRef.current.play();
       setPlayStatus(true);
        
    }

    const previous = async ()=>{
       songsData.map(async(item,index)=>{
           if(track._id === item._id && index > 0){
                await setTrack(songsData[index-1]);
                await audioRef.current.play();
                setPlayStatus(true);
           }
       })

    }    
    const next = async ()=>{
        songsData.map(async(item,index)=>{
            if(track._id === item._id && index < songsData.length-1){
                await setTrack(songsData[index+1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }
    
            
    const seekSong=(e)=>{
        audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    }

    const getSongsData = async () => {
        try {
            console.log('Fetching songs from:', `${url}/api/song/list`);
            const response = await axios.get(`${url}/api/song/list`);
            console.log('Songs response:', response.data);
            if (response.data && response.data.songs) {
                setSongsData(response.data.songs);
                if (response.data.songs.length > 0) {
                    setTrack(response.data.songs[0]);
                }
            } else {
                console.error('Invalid response format:', response.data);
                toast.error("Invalid response format from server");
            }
        } catch (error) {
            console.error("Error fetching songs:", error.message);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            setSongsData([]);
            setTrack(null);
            toast.error(`Error loading songs: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const getAlbumsData = async () => {
        try {
            console.log('Fetching albums from:', `${url}/api/album/list`);
            const response = await axios.get(`${url}/api/album/list`);
            console.log('Albums response:', response.data);
            if (response.data && response.data.albums) {
                setAlbumsData(response.data.albums);
            } else {
                console.error('Invalid album response format:', response.data);
                toast.error("Invalid album response format from server");
            }
        } catch (error) {
            console.error("Error fetching albums:", error.message);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            setAlbumsData([]);
            toast.error(`Error loading albums: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                const totalMinute = Math.floor(audioRef.current.duration / 60);
                const totalSecond = Math.floor(audioRef.current.duration % 60);
                const currentMinute = Math.floor(audioRef.current.currentTime / 60);
                const currentSecond = Math.floor(audioRef.current.currentTime % 60);

                if (seekBar.current) {
                    const progressWidth = (audioRef.current.currentTime/audioRef.current.duration)*100;
                    seekBar.current.style.width = progressWidth+"%";
                }

                setTime({
                    currentTime:{minute:currentMinute,second:currentSecond},
                    totalTime:{minute:totalMinute,second:totalSecond}
                })
            }
        }
    },[audioRef.current]);

    useEffect(()=>{
    getSongsData();
    getAlbumsData();
    },[])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        time,
        track,
        playStatus,
        next,
        previous,
        play,
        pause,
        playWithId,
        seekSong,
        songsData,
        albumsData,
        
    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;