import React, { useState,useEffect } from "react";
import { TextField, Button, Box,CircularProgress  } from "@mui/material";
import API from "./admin-api.jsx";

const UploadSong = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [loading, setLoading] = useState(false);

  const [coverFile, setCoverFile] = useState(null);
  const [songFile, setSongFile] = useState(null);

  const handleUpload = async () => {
    if (!songFile) return alert("Select song [and cover] files");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    //formData.append("image", songImage);
     formData.append("song", songFile);
    formData.append("cover", coverFile); 
    
    //formData.append("song", songFile);

    try {
      setLoading(true)
      const { data } = await API.post("/upload-song", formData, {
        headers: { "Content-Type": "multipart/form-data" }
        
        

      });
      alert("Song uploaded successfully!");
      setTitle(""); setArtist(""); setAlbum(""); setCoverFile(null); setSongFile(null);
    } catch (err) {
      alert(err.response.data.error || "Upload failed");
    }finally{setLoading(false)}
  };

  return (<div>
    <Box display="flex" pr={12} justifyContent="flex-end" flexDirection="column" maxWidth={500} mx="auto" ml={50} mt={5}>
      <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} margin="normal" />
      <TextField label="Artist" value={artist} onChange={e => setArtist(e.target.value)} margin="normal" />
      <TextField label="Album" value={album} onChange={e => setAlbum(e.target.value)} margin="normal" />
        <li style={{listStyle:"none",width:"50%",marginInlineStart:"0px"}} >Upload Song Cover(.jpeg/.png)</li>
        <li style={{listStyle:"none", marginLeft:"auto",marginTop:"-20px",marginInlineEnd:"90px"}}>Upload Song File(.mp3)</li>
      <input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files[0])} style={{ marginTop: 20,width:"50%" }} />
      
      <input type="file" accept="audio/*" onChange={e => setSongFile(e.target.files[0])} style={{ marginTop: "-22px",marginLeft:"auto" }} />
      
      <Button variant="contained" disabled={loading} onClick={handleUpload} sx={{ mt: 2 }}>      {loading ? (
          <>
            <CircularProgress
              size={20}
              sx={{ color: "white", mr: 1 }}
            />
            Uploading...
          </>
        ) : (
          "Upload Song"
        )}</Button>
    </Box>
    </div>
  );
};

export default UploadSong;
