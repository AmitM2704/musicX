// src/components/context/MusicCont.jsx
import { createContext, useContext, useState, useRef, useEffect } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Event listeners
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setSongDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setSongDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setSongDuration);
    };
  }, []);

  const playSong = (song) => {
    if (!song) return;

    const url = song.songUrl || song.url; // adjust your field name here

    if (!url) {
      console.warn("Song has no URL:", song);
      return;
    }

    audioRef.current.src = url;
    audioRef.current
      .play()
      .then(() => {
        setCurrentSong(song);
        setIsPlaying(true);
      })
      .catch((err) => console.error("Playback error:", err));
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resumeSong = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    isPlaying ? pauseSong() : resumeSong();
  };

  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <MusicContext.Provider
      value={{
        audioRef,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        playSong,
        pauseSong,
        resumeSong,
        togglePlay,
        seekTo,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

// ✅ THIS IS THE EXPORT YOU WERE MISSING
export const useMusic = () => useContext(MusicContext);
