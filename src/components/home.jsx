// Sidebar.jsx (updated: hide Login/Signup when user is logged in)
import "./home.css";
import MusicSlider from "./slider";
import { useTheme, useMediaQuery } from '@mui/material';
import API from "../api.jsx";
import { useEffect } from "react";

import {
  AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, Box, TextField, Button,
  Paper
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import Slider from '@mui/material/Slider';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import SearchIcon from "@mui/icons-material/Search";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Header from "./header.jsx";
import Item from '@mui/material/Stack';
import { useMusic } from "../components/context/MusicCont.jsx";

const drawerWidth = 240;

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [songs, setSongs] = useState([]);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = !isDesktop;

  const nav = useNavigate();
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const { isPlaying, setIsPlaying } = useMusic();

  const [open, setOpen] = useState(isDesktop);
  const { playSong } = useMusic();

  // ---------- New: login state ----------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);


  const logout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  nav("/"); 

    window.location.reload();

};

  useEffect(() => {
    // check local storage for token first
    const token = localStorage.getItem("token"); // change key if you use different key
    if (!token) {
      setIsLoggedIn(false);
      setAuthChecking(false);
      return;
    }



    // optional: verify token with backend endpoint (e.g. /me)
    const verify = async () => {
      try {
        setAuthChecking(true);
        // send token as Bearer; adjust header if your API expects a different format
        await API.get("/me", { headers: { Authorization: `Bearer ${token}` } });
        setIsLoggedIn(true);
      } catch (err) {
        console.warn("Token validation failed:", err);
        // token invalid -> clear it
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } finally {
        setAuthChecking(false);
      }
    };

    verify();
  }, []);
  // ---------------------------------------

  const toggleDrawer = () => setOpen(!open);

  useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    const fetchall = async () => {
      try {
        const { data } = await API.get("/songs");
        setSongs(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchall();
  }, []);

  return (
    <div style={{ height: "100vh" }}>

      {/* MOBILE APPBAR */}
      {isMobile && (
        <AppBar position="fixed" color="transparent" elevation={0} sx={{ bgcolor: "white" }}>
          <Toolbar sx={{ px: 1 }}>
            <IconButton onClick={toggleDrawer} edge="start">
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" sx={{ backgroundColor:"black",color:"white",flexGrow: 1, textAlign: "center", fontFamily: "cursive" }}>
              MusicX
            </Typography>

            <Box sx={{ width: 40 }} /> {/* keeps title centered */}
          </Toolbar>
        </AppBar>
      )}

      {!isMobile && (
        <h1 style={{
          fontFamily: "cursive",
          marginTop: "-10px",
          marginInline: "50%",
          textAlign: "center",
          backgroundColor:"black",
        }}>
         MusicX
        </h1>
      )}

      {/* Top-right Login/Signup button: only show when NOT logged in */}

      {isLoggedIn && (
        <div>
          <Button
            variant="contained"
            onClick={logout}
            sx={{
              display:"flex",
              width:"fit-content",
              color: "black",
              backgroundColor: "crimson",
              position: "fixed",
              right: "0",
              top: "5%",
              transform: "translateY(-50%)",
              zIndex: 2000,
            }}
          >
            Logout
          </Button>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <Button
            variant="contained"
            onClick={() => nav("/login")}
            sx={{
              display:"flex",
              width:"fit-content",
              color: "black",
              backgroundColor: "seagreen",
              position: "fixed",
              right: "0",
              top: "5%",
              transform: "translateY(-50%)",
              zIndex: 2000,
            }}
          >
            Login
          </Button>
        </div>
      )}

      {/* DRAWER */}
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop ? true : open}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "black",
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
      >
        <Toolbar sx={{ display: "flex" }}>
          <Typography color="white" variant="h6" noWrap>
            My Dashboard
          </Typography>
        </Toolbar>

        <List>
          {[
            { text: "Home", icon: <HomeIcon />, path: "/" },
            { text: "List", icon: <QueueMusicIcon />, path: "/song-list" },
            { text: "About", icon: <InfoIcon />, path: "/" }
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" } }}
                onClick={()=>nav(item.path)}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText sx={{ color: "white" }} primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <div
        content="main"
        style={{
          marginLeft: isDesktop ? drawerWidth : 0,
          marginTop: isMobile ? 70 : 0,
          padding: 10
        }}
      >
        {/* Top Hits */}
        <Paper elevation={1} sx={{marginTop: 5, textAlign: "left", padding: 0 }}>
          <Typography sx={{ backgroundColor:"magenta",fontFamily: "fantasy", color: "black" }} variant="h4">
            Top Hits
          </Typography>
        </Paper>

{/* Responsive Top Hits / songs */}
<Stack
  divider={<Divider orientation="vertical" flexItem />}
  marginTop={5}
  direction={{ xs: "column", sm: "row" }}   // column on phones, row on wider screens
  spacing={2}
  sx={{
    flexWrap: { xs: "nowrap", sm: "wrap" }, // nowrap on phones (stack), wrap on larger screens
    justifyContent: "center",
    alignItems: "flex-start",
    px: { xs: 2, sm: 0 }                    // small horizontal padding on phones
  }}
>
  {(songs || []).map((song, idx) => (
    <Box
      key={song._id || idx}
      onClick={() => {
        setCurrentSongIndex(idx);
        setShouldPlay(true);
      }}
      sx={{
        cursor: "pointer",
        // responsive sizing:
        flex: { xs: "1 0 100%", sm: "0 0 140px" }, // full width on mobile, fixed 140px on desktop
        maxWidth: { xs: "100%", sm: 140 },
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "100%" }, // image fills the container
          height: 140,
          backgroundImage: `url(${song.coverUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 2,
          boxShadow: 4,
          cursor: "pointer",
          flexShrink: 0,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          width: "100%",
          fontWeight: 600,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {song.title}
      </Typography>
    </Box>
  ))}
</Stack>

        {/* MOST PLAYED */}
        <Paper elevation={1} sx={{ marginTop: 5, textAlign: "left", padding: 0 }}>
          <Typography sx={{ backgroundColor:"magenta",fontFamily: "fantasy", color: "black" }} variant="h4">
            Most Played in India
          </Typography>
        </Paper>

        {/* horizontal scroll: removed marginLeft and added left padding + scrollPadding */}
        <Stack
          divider={<Divider orientation="vertical" flexItem />}
          direction="row"
          spacing={2}
          sx={{
            mt: 2,
            overflowX: "auto",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            pb: 1,
            pl: { xs: 2, md: 0 },
            scrollPaddingInlineStart: "16px"
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
            <Box
              key={idx}
              onClick={() => alert("ok")}
              sx={{
                flex: "0 0 140px",
                minWidth: 120,
                height: 120,
                textAlign: "center",
                backgroundColor: "azure",
                "&:hover": { backgroundColor: "antiquewhite" },
                cursor: "pointer",
                boxShadow: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1
              }}
            >
              {item}
            </Box>
          ))}
        </Stack>

        {/* YOURS */}
        <Paper elevation={1} sx={{ marginTop: 5, textAlign: "left", padding: 0 }}>
          <Typography sx={{ backgroundColor:"magenta",fontFamily: "fantasy", color: "black" }} variant="h4">
            Yours
          </Typography>
        </Paper>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 2,
            overflowX: "auto",
            whiteSpace: "nowrap",
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            pl: { xs: 2, md: 0 },
            scrollPaddingInlineStart: "16px"
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
            <Box
              key={idx}
              sx={{
                flex: "0 0 140px",
                width: 140,
                height: 100,
                textAlign: "center",
                backgroundColor: "azure",
                "&:hover": { backgroundColor: "antiquewhite" },
                cursor: "pointer",
                boxShadow: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1
              }}
            >
              {item}
            </Box>
          ))}
        </Stack>
      </div>

      {/* MUSIC PLAYER */}
      <MusicSlider
        songs={songs}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        shouldPlay={shouldPlay}
        setShouldPlay={setShouldPlay}
      />
    </div>
  );
};

export default Sidebar;
