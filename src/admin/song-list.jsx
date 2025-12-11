import React from "react";
import { useEffect,useState } from "react";
import UploadSong from "./UploadSong";
import { Paper,Typography,Box,Button,CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import API from "./admin-api";

console.log(localStorage.getItem("name"));
console.log(localStorage.getItem("isadmin"))
const isadmin = localStorage.getItem("isadmin")
const SongList = () => {
  const navigate = useNavigate();
 useEffect(() => {
  // read fresh values inside effect (not at module top)
  const token = localStorage.getItem("token");
  const rawIsAdmin = localStorage.getItem("isadmin");

  // quick parse: convert "true"/"1"/true -> boolean true
  const isAdminFlag = rawIsAdmin === true || rawIsAdmin === "true" || rawIsAdmin === "1";

  const isAuthenticated = !!token;

  // Wait until we know authentication; if no token -> redirect
  if (!isAuthenticated) {
    console.log("No token — redirect to login");
    toast.warning("Admin Login required!", { position: "top-center" });
    navigate("/login");
    return;
  }

  // If authenticated but not admin -> redirect
  if (!isAdminFlag) {
    console.log("Authenticated but not admin — redirect to login");
    toast.warning("Admin Login required!", { position: "top-center" });
    navigate("/login");
    return;
  }


  // navigate("/admin-dashboard"); // only use if you actually need to redirect
}, [navigate]);


useEffect(() => {
    API.get("/list")
      .then(res => setSongs(res.data))
      .catch(err => console.error("Error fetching songs:", err));
  }, []);

    const [loading, setLoading] = useState(false);
    const [loadingId, setLoadingId] = useState(null);

    const handleRemove = async (id) => {
    setLoadingId(id);
    try {
        await API.delete(`/delete-song/${id}`);
        setSongs((prevSongs) => prevSongs.filter((song) => song._id !== id));
        toast.success("Song removed successfully!");
    } catch (err) {
        console.error(err);
        toast.error("Failed to remove song!");
    } finally {
        setLoadingId(null);
    }
    };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    toast.info("Logged Out!", { position: "top-center" });

  };
//   const handleRemove=async(id)=>{
//     try {
//         await API.delete(`/delete-song/${id}`);
//         toast.success("Song removed successfully!", { position: "top-center" });
//         setSongs(songs.filter((song) => song._id !== id));
//   } catch (error) {
//         console.error("Error deleting song:", error);
//         toast.error("Failed to delete song!", { position: "top-center" });
//   }finally{setLoading(false)}
    
  
  useEffect(() => {
  API.get("/list")
    .then(res => {
      console.log("Fetched Songs:", res.data);
      setSongs(res.data);
    })
    .catch(err => console.error("Error fetching songs:", err));
}, []);


    const [songs, setSongs] = useState([]);
        return (
            <div>
            {/* Header */}
            <Paper sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h4">MusicX</Typography>
            </Paper>

            <Paper elevation={1} sx={{mb:2, width:"100%",display: "flex", justifyContent: "center" }}>
                <Typography fontFamily={"fantasy"} variant="h5">
                List of uploaded songs by {localStorage.getItem("name")}
                </Typography>
            </Paper>

            {/* Logout button */}
            <Box
                sx={{
                position: "fixed",
                top: 20,
                right: 16,
                zIndex: 1000,
                }}
            >
                <Button  variant="outlined" onClick={handleLogout} sx={{ mt: 0, ml: 2 }}>
                Logout
                </Button>
            </Box>
                        <Box
                sx={{
                position: "fixed",
                top: 50,
                right: 160,
                zIndex: 1000,
                }}
            >
                <Button color="info"  variant="outlined" onClick={()=>setTimeout(() => {
                    {navigate("/admin-dashboard")}
                }, 200)} sx={{ top: 20, left:20 ,position:"fixed" }}>
                Add More
                </Button>
            </Box>
            {/* Song list */}
            <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
                {songs && songs.length > 0 ? (
                songs.map((song) => (
                    <React.Fragment key={song._id}>
                    <ListItem sx={{gap:10}} alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar sx={{marginTop:5,width:"100px",height:"100px",borderRadius:1,backgroundSize:"cover"}}
                            alt={song.title}
                            src={song.coverUrl} // Cloudinary image URL
                        />
                        </ListItemAvatar>
                        <ListItemText 
                        primary={<Typography sx={{ color: "text.primary", display: "inline",marginLeft:"-60px",fontSize:"larger",fontWeight:"300" }}>{song.title}</Typography>}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: "text.primary", display: "inline",marginLeft:"-40px",fontStyle:"normal" }}
                            >
                                {song.artist}
                            </Typography>
                            <br />
                            <audio
                                controls
                                type="audio/mpeg"
                                src={song.songUrl} // Cloudinary mp3 URL
                                style={{ width: "220%",height:"50px", marginTop: "30px" }}
                            ></audio>
                            {/* <Box
                                sx={{
                                position: "fixed",
                                top: 0,
                                right: 0,
                                zIndex: 1000,
                                }}
                            >
                                <Button variant="outlined" onClick={handleRemove} sx={{ mt: 0, ml: 2 }}>
                                Remove
                                </Button> */}
                            {/* </Box> */}
                            </React.Fragment>
                        }
                        />
                         <Box
                                sx={{
                                position: "sticky",
                                
                    
                                }}
                            >
                      <Button
                        color="warning"
                        disabled={loadingId === song._id}
                        variant="outlined"
                        onClick={() => handleRemove(song._id)}
                        sx={{ mt: 0, ml: 2 }}
                        >
                        {loadingId === song._id ? (
                            <>
                            <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
                            Removing...
                            </>
                        ) : (
                            "Remove"
                        )}
                        </Button>

 
                             </Box> 
                    </ListItem>
    
                    <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))
                ) : (
                <Typography sx={{ textAlign: "center", mt: 3 }}>
                    No songs uploaded yet.
                </Typography>
                )}
            </List>
            </div>
        );}
    
export default SongList;
