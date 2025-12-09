import "./home.css";
import MusicSlider from "./slider";
//import PlaylistForm from "./playlistadd.jsx";
import {useTheme, useMediaQuery } from '@mui/material';
import API from "../api.jsx";
import {  useEffect} from "react";

import {
  AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, Box,TextField,Button,
  Paper} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";

import Slider from '@mui/material/Slider';
//import IconButton from '@mui/material/IconButton';
//import Stack from '@mui/material/Stack';
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
//import Box from '@mui/material/Box';
//import { Box, Button, TextField, Typography, Paper,useMediaQuery  } from "@mui/material";


// export default function Home(props) {
    

//     return(
//         <div className="roothome">
//             <h2>Hiii {props.name}</h2>

//         <nav className="navbar">
//             <Box sx={{backgroundColor:"black",height:60}}></Box>
//         </nav>
//         </div>
        
//     )
// }
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Header from "./header.jsx";


//import getTopTracks from "./spotify.jsx";

import Item from '@mui/material/Stack';


// Header.jsx
import { useMusic } from "../components/context/MusicCont.jsx";

//console.log(getTopTracks())

const drawerWidth = 240;


const Sidebar = () => {
    const [playlists, setPlaylists] = useState([]);
    
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    
    const [shouldPlay, setShouldPlay] = useState(false);

    const [songs, setSongs] = useState([])
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const nav = useNavigate();
    const [search,setSearch] = useState(false);
    const [query, setQuery] = useState("");
    const { isPlaying, setIsPlaying } = useMusic();
    const [open, setOpen] = useState(!isMobile); // default open for desktop
    const { playSong } = useMusic();
    
      const toggleDrawer = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchall=async()=>{
    try{
      const {data} = await API.get("/songs");
      setSongs(data);
    }
    catch(err){
      console.log(err);
    }
  }
  fetchall();
  }, [])

  console.log(songs);
  
  

  return (

    
    <div style={{height:"100vh"}}>
        {/* <Header/> */}
            {isMobile && (
        <IconButton onClick={toggleDrawer} sx={{ position: "fixed", top: 10, left: 10, zIndex: 2000 }}>
          <MenuIcon />
        </IconButton>
      )}
      <h1 style={{fontFamily:"cursive",position:"sticky",marginTop:"-10px",marginInline:"50%",textAlign:"center",color:"black"}}>MusicX</h1>
      
    <Drawer
      elevation={0}
        variant={isMobile ? "temporary" : "permanent"} // changed for small screens
        open={open}
        onClose={toggleDrawer}
        //open={!isMobile || undefined} 
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
            backgroundColor: "gray",
            width: drawerWidth,
            boxSizing: "border-box" 
            },
        
      //elevation={0}
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { backgroundColor:"black",width: drawerWidth,boxSizing: 'border-box' },
      }}
    >
      <Toolbar sx={{display:"flex"}}>
        <Typography color="white" variant="h6" noWrap component="div">
          My App
        </Typography>
      </Toolbar>
      <List>
        {[
          { text: "Home", icon: <HomeIcon />,path:"/" },
          //{ text: "Search", icon: <SearchIcon />,src:()=>setSearch() },
          { text: "List", icon: <QueueMusicIcon />,path:"/" },
          { text: "About", icon: <InfoIcon />,path:"/" }
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton   sx={{
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.15)",   // light grey
    },
  }} onClick={()=>{{setSearch(true)}
        //alert(search)
    }
         }>
              <ListItemIcon sx={{color:"white"}} >{item.icon}</ListItemIcon>
              <ListItemText sx={{color:"white"}} primary={item.text} />
              
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
{/*     
            {(search&&
          <Box sx={{marginTop:1, marginLeft:30, border:1,borderRadius:80,backgroundColor:"azure",display: 'flex', gap: 0, mb: 3 }}>
            <TextField 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              label="Search"
              variant="outlined"
              autoFocus
              sx={{borderRadius:10,flexGrow: 1, minWidth: 0,overflow:"hidden" }}
            />
            <Button sx={{ml:"auto",borderRadius:20,display:"flex",backgroundColor:"green"}} variant="contained" >Go</Button>
          </Box>
        )} */}
      <div content="main">
        <Paper
            elevation={1}
            sx={{
              marginTop: 5,
              marginLeft: { xs: 2, sm: 30 }, // responsive margin
              textAlign: "left",
              padding: 2,
            }}
          >
            <Typography sx={{ fontFamily: "fantasy", color: "black" }} variant="h4">
              Top Hits
            </Typography>
          </Paper>
          <Stack 
            divider={<Divider orientation="vertical" flexItem />}
            marginTop={5}
            marginLeft={{ xs: 0, sm: "250px" }} // responsive margin
            useFlexGap
            direction="row"
            spacing={2}
            sx={{ flexWrap: "wrap", justifyContent: "center" }} // wrap on small screens
          >

            {songs.map((song,idx) => (
              <Box
                key={song._id}
            onClick={() => {
            setCurrentSongIndex(idx);
            setShouldPlay(true);     
}}

                  


                sx={{
                  cursor:"pointer",
                  flex: "0 0 140px",
                  textAlign:"center",
                  display: "flex",
                  flexDirection:"column",
                  alignItems: "center",
                  
                }}
              >
              <Box
                sx={{
                  width: "100%",
                  height: 140,                             // ← IMPORTANT: big enough
                  backgroundImage: `url(${song.coverUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: 2,
                  boxShadow: 4,
                  cursor: "pointer",
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
          <Paper
            elevation={1}
            sx={{
              marginTop: 5,
              marginLeft: { xs: 2, sm: 30 }, // responsive margin
              textAlign: "left",
              padding: 2,
            }}
          >
            <Typography sx={{ fontFamily: "fantasy", color: "black" }} variant="h4">
              Most Played in India
            </Typography>
          </Paper>

          <Stack
            divider={<Divider orientation="vertical" flexItem />}
            marginLeft={{ xs: 0, sm: "250px" }}
            useFlexGap
            direction="row"
            spacing={2}
            sx={{ "&::-webkit-scrollbar": { display: "none" },scrollbarWidth:"none",overflowX:"auto",flexWrap: "nowrap", justifyContent: "center", marginTop: 3 }}
          >
            {[1, 2, 3,4,5,6,7,8].map((item, idx) => (
              <Box
                key={idx}
                onClick={() => alert("ok")}
                sx={{
                  flex: "0 0 140px",
                  flexGrow: 0,
                  flexShrink:0,
                  minWidth: { xs: "80%", sm: 100 },
                  height: 120,
                  width:120,
                  textAlign: "center",
                  backgroundColor: "cornsilk",
                  "&:hover": { backgroundColor: "antiquewhite" },
                  cursor: "pointer",
                  boxShadow: 4,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item}
              </Box>
            ))}
          </Stack>

          <Paper
            elevation={1}
            sx={{
              marginTop: 5,
              marginLeft: { xs: 2, sm: 30 }, // responsive margin
              textAlign: "left",
              padding: 2,
            }}
          >
            <Typography sx={{ fontFamily: "fantasy", color: "black" }} variant="h4">
              Yours
            </Typography>
          </Paper>

          <Stack
            direction="row"
            spacing={2}
            marginTop={5}
            marginLeft={{ xs: 0, sm: "250px" }}
            sx={{
              overflowX: "auto",     // enable horizontal scroll
              flexWrap: "nowrap",    // keep in single row
              pb: 1,
              "&::-webkit-scrollbar": { display: "none" }, // optional: hide scrollbar
              scrollbarWidth: "none",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: "0 0 140px",   // ❗ no grow, no shrink, width = 140px
                  // OR explicitly:
                  // flexGrow: 0,
                  // flexShrink: 0,
                  // width: 140,
                  height: 100,
                  textAlign: "center",
                  backgroundColor: "cornsilk",
                  "&:hover": { backgroundColor: "antiquewhite" },
                  cursor: "pointer",
                  boxShadow: 4,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item}
              </Box>
            ))}
          </Stack>
      </div>

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


export default Sidebar
