import React, { useState } from "react";
import { TextField, Button, Box, CircularProgress,Link,Paper,Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import API from "./admin-api.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";



const ADLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [check,setCheck]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("name",(data.user.name));
      localStorage.setItem("user", JSON.stringify(data.user.name));
      toast.info("Logged in!", { position: "top-center" });
      if(check){
      navigate("/admin-dashboard");}
      else navigate("/home");
      //alert("ok")
      
    } catch (err) {
      // Safe error handling
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
       <Paper sx={{display:"flex",justifyContent:"center"}}>
        <Typography variant="h2">HOMEY</Typography>
      </Paper>
    <Box display="flex" flexDirection="column" maxWidth={400} mx="auto" mt={10}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />

      {error && (
        <Box color="red" mt={1} mb={1}>
          {error}
        </Box>
      )}

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Login"}

        
      </Button>
      <Typography>Are you an admin?
          <Checkbox checked={check} onChange={(e)=>setCheck(e.target.checked)}></Checkbox>
      </Typography>

      
            <Link  component={RouterLink}
      to="/admin-signup"
      underline="hover"
      color="red"
      sx={{ fontWeight: "bold",fontStyle:"italic" }}>
        Not an Existing User? SignUp!
      </Link>
    </Box>
    </div>
  );
};

export default ADLogin;
