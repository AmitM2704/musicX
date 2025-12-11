// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate(); // <--- useNavigate hook

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/admin/signup", formData, {
//         headers: { "Content-Type": "application/json" }
//       });

//       setMessage(res.data.message || "Signup successful");

//       // Redirect to login after successful signup
//       navigate("/login");
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
//         <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//         <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//         <button type="submit">Signup</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Signup;
import { Link as RouterLink } from "react-router-dom";

import React, { useState } from "react";
import {Link, TextField, Button, Box, CircularProgress,Paper,Typography } from "@mui/material";
import API from "./admin-api.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ADSignup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/signup", { name,email, password });
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));
      toast.info("Signed Up!", { position: "top-center" });
      navigate("/login");
      //alert("ok")
      
    } catch (err) {
      // Safe error handling
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Signup Error!Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Paper sx={{display:"flex",justifyContent:"center"}}>
          <Typography sx={{fontFamily:"cursive"}} variant="h2">MusicX</Typography>
        </Paper>
    <Box display="flex" flexDirection="column" maxWidth={400} mx="auto" mt={10}>
      
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
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
      <Link  component={RouterLink}
      to="/login"
      underline="hover"
      color="primary"
      sx={{ fontWeight: "bold" }}>
        Already an Existing User? Login!
      </Link>
    </Box>
    </div>
  );
};

export default ADSignup;
