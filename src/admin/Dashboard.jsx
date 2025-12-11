import React from "react";
import { useEffect } from "react";
import UploadSong from "./UploadSong";
import { Paper,Typography,Box,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

console.log(localStorage.getItem("name"))
const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");
    if (!isAuthenticated) {
      console.log("Login Required!");
      toast.warning("Login required!", { position: "top-center" });

      // Give the toast a moment to appear before redirect
      setTimeout(() => {
        navigate("/admin-login");
      }, 1);

    }
    //else navigate("/admin-dashboard");
  }, [navigate]);



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin-login");
    toast.info("Logged Out!", { position: "top-center" });

  };

  return (
    <div>
      <Paper sx={{display:"flex",justifyContent:"center"}}>
        <Typography variant="h4">MusicX</Typography>
      </Paper>
      <Paper sx={{display:"flex",justifyContent:"center"}}><Typography fontFamily={"fantasy"} variant="h4"> Welcome back , {localStorage.getItem("name")}</Typography></Paper>
      

    <Box sx={{
          position: "fixed",
          top:20,
          right: 16,
          zIndex: 1000,
        }}>
      <Button variant="outlined" onClick={handleLogout} sx={{ mt: 0, ml: 2 }}>Logout</Button>
      
    </Box>
    <UploadSong />
    </div>
  );
};

export default Dashboard;
