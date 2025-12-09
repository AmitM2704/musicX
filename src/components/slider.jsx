import React, { useRef, useState, useEffect } from "react";
import { Box, Slider, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const MusicSlider = ({ songs, currentSongIndex, setCurrentSongIndex,shouldPlay,setShouldPlay }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  //const [shouldPlay, setShouldPlay] = useState(false);


  const hasSongs = songs && songs.length > 0;
  const currentSong = hasSongs ? songs[currentSongIndex] : null;

  const getSongUrl = (song) => {
    if (!song) return "";
    if (typeof song === "string") return song;

    // 👇 make sure at least ONE of these matches your backend
    return (
      song.audioUrl ||   // e.g. your field
      song.songUrl  ||
      song.fileUrl  ||
      song.url      ||
      ""
    );
  };

  const src = getSongUrl(currentSong);
  console.log("Current song:", currentSong);
  console.log("Audio src is:", src);

  const togglePlay = () => {
  const audio = audioRef.current;
  if (!audio) {
    console.log("No audioRef yet");
    return;
  }

  console.log("togglePlay, currentSrc =", audio.currentSrc);

  if (isPlaying) {
    audio.pause();
    setIsPlaying(false);
  } else {
    audio
      .play()
      .then(() => {
        console.log("Play started");
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Play error:", err, {
          networkState: audio.networkState,
          readyState: audio.readyState,
          src: audio.currentSrc,
        });
      });
  }
};

  const nextSong = () => {
    if (!hasSongs) return;
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setCurrentTime(0);
  };

  const prevSong = () => {
    if (!hasSongs) return;
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setCurrentTime(0);
  };

  // Listen for time + duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime || 0);
    const setSongDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setSongDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setSongDuration);
    };
  }, []);

 useEffect(() => {
  if (!audioRef.current) return;
  const audio = audioRef.current;

  audio.pause();
  audio.load();
  setCurrentTime(0);

  if (shouldPlay || isPlaying) {
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setShouldPlay(false); // reset flag
      })
      .catch(() => {});
  }
}, [currentSongIndex, shouldPlay]);


  const handleSliderChange = (e, newValue) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: "#121212",
        color: "#fff",
        display: "flex",
        marginLeft: "232px",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 1, sm: 2 },
        boxShadow: 3,
        marginRight: "-10px",
      }}
    >
<audio
  ref={audioRef}
  src={src || undefined}          // 👈 bind src directly
  onLoadedMetadata={(e) => {
    const audio = e.currentTarget;
    setDuration(audio.duration || 0);
    console.log("Loaded metadata. Duration:", audio.duration);
  }}
  onTimeUpdate={(e) => {
    const audio = e.currentTarget;
    setCurrentTime(audio.currentTime || 0);
  }}
  onError={(e) => {
    const a = e.currentTarget;
    console.log("AUDIO ERROR:", a.error, {
      networkState: a.networkState,
      readyState: a.readyState,
      src: a.currentSrc,
    });
  }}
/>

      <Box sx={{ marginInlineStart: 30, display: "flex", alignItems: "center", gap: 1 }}>
        <Typography marginLeft={"-250px"} noWrap>
          Now playing: {currentSong?.title || "—"}
        </Typography>
        <IconButton onClick={prevSong} sx={{ color: "white" }}>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton onClick={togglePlay} sx={{ color: "white" }}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton onClick={nextSong} sx={{ color: "white" }}>
          <SkipNextIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, ml: 2 }}>
        <Typography sx={{ minWidth: 35 }}>{formatTime(currentTime)}</Typography>
        <Slider
          value={duration ? currentTime : 0}
          min={0}
          max={duration || 0}
          onChange={handleSliderChange}
          sx={{
            mx: 2,
            flexGrow: 1,
            minWidth: 40,
            color: "#1DB954",
            "& .MuiSlider-thumb": { width: 12, height: 12 },
          }}
        />
        <Typography sx={{ minWidth: 35 }}>{formatTime(duration)}</Typography>
      </Box>
    </Box>
  );
};

export default MusicSlider;
