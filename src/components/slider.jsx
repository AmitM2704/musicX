import React, { useRef, useState, useEffect } from "react";
import { Box, Slider, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const drawerWidth = 240; // keep this in sync with your Sidebar drawerWidth

const MusicSlider = ({ songs, currentSongIndex, setCurrentSongIndex, shouldPlay, setShouldPlay }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const hasSongs = songs && songs.length > 0;
  const currentSong = hasSongs ? songs[currentSongIndex] : null;

  const getSongUrl = (song) => {
    if (!song) return "";
    if (typeof song === "string") return song;
    return song.audioUrl || song.songUrl || song.fileUrl || song.url || "";
  };

  const src = getSongUrl(currentSong);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
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
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setShouldPlay(false);
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // left offset to avoid covering the permanent drawer on desktop
  const leftOffset = isDesktop ? `${drawerWidth}px` : 0;

  return (
    <Box
      sx={{
        position: "fixed",           // fixed is more reliable for bottom players
        bottom: 0,
        left: leftOffset,
        right: 0,
        zIndex: 1300,
        backgroundColor: "#121212",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 1, sm: 1.5 },
        boxShadow: 3,
        overflow: "hidden",          // prevent any overflow
      }}
    >
      <audio
        ref={audioRef}
        src={src || undefined}
        onLoadedMetadata={(e) => {
          const audio = e.currentTarget;
          setDuration(audio.duration || 0);
        }}
        onTimeUpdate={(e) => {
          const audio = e.currentTarget;
          setCurrentTime(audio.currentTime || 0);
        }}
        onError={(e) => {
          const a = e.currentTarget;
          console.log("AUDIO ERROR:", a.error, { networkState: a.networkState, readyState: a.readyState, src: a.currentSrc });
        }}
      />

      {/* Left controls + title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
        <Typography
          noWrap
          sx={{
            maxWidth: { xs: 120, sm: 200, md: 320 },
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
          }}
        >
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

      {/* Slider area */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1, minWidth: 0 }}>
        <Typography sx={{ minWidth: 35, fontSize: { xs: "0.75rem", sm: "0.85rem" } }}>{formatTime(currentTime)}</Typography>

        <Slider
          value={duration ? currentTime : 0}
          min={0}
          max={duration || 0}
          onChange={handleSliderChange}
          sx={{
            mx: 1,
            flexGrow: 1,
            minWidth: 40,
            color: "#1DB954",
            "& .MuiSlider-thumb": { width: 12, height: 12 },
          }}
        />

        <Typography sx={{ minWidth: 35, fontSize: { xs: "0.75rem", sm: "0.85rem" } }}>{formatTime(duration)}</Typography>
      </Box>
    </Box>
  );
};

export default MusicSlider;
