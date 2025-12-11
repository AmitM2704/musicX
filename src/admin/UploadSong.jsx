import React, { useState } from "react";
import { TextField, Button, Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import API from "./admin-api.jsx";

const UploadSong = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [songFile, setSongFile] = useState(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = !isDesktop;

  const handleUpload = async () => {
    if (!songFile) return alert("Select song [and cover] files");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("song", songFile);
    formData.append("cover", coverFile);

    try {
      setLoading(true);
      const { data } = await API.post("/upload-song", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Song uploaded successfully!");
      setTitle(""); setArtist(""); setAlbum(""); setCoverFile(null); setSongFile(null);
    } catch (err) {
      alert(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={500}
      mx="auto"
      mt={5}
      pr={isDesktop ? 12 : 0}
      ml={isDesktop ? 50 : 0}
      px={isMobile ? 2 : 0}   // mobile padding
    >
      {/* TEXT FIELDS */}
      <TextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth={isMobile}
        margin="normal"
      />

      <TextField
        label="Artist"
        value={artist}
        onChange={e => setArtist(e.target.value)}
        fullWidth={isMobile}
        margin="normal"
      />

      <TextField
        label="Album"
        value={album}
        onChange={e => setAlbum(e.target.value)}
        fullWidth={isMobile}
        margin="normal"
      />

      {/* FILE LABELS */}
      <Box
        display="flex"
        justifyContent="space-between"
        mt={1}
        flexDirection={isMobile ? "column" : "row"}
        gap={isMobile ? 1 : 0}
      >
        <li style={{ listStyle: "none" }}>Upload Song Cover (.jpeg/.png)</li>
        <li style={{ listStyle: "none" }}>Upload Song File (.mp3)</li>
      </Box>

      {/* FILE INPUTS */}
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={isMobile ? "column" : "row"}
        mt={1}
        gap={isMobile ? 2 : 0}
      >
        <input
          type="file"
          accept="image/*"
          onChange={e => setCoverFile(e.target.files[0])}
          style={{
            width: isMobile ? "100%" : "48%",
            marginTop: 10,
          }}
        />

        <input
          type="file"
          accept="audio/*"
          onChange={e => setSongFile(e.target.files[0])}
          style={{
            width: isMobile ? "100%" : "48%",
            marginTop: isMobile ? 0 : 10,
          }}
        />
      </Box>

      {/* SUBMIT BUTTON */}
      <Button
        variant="contained"
        disabled={loading}
        onClick={handleUpload}
        sx={{
          mt: 3,
          width: isMobile ? "100%" : "auto",
          alignSelf: isMobile ? "center" : "flex-start"
        }}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />
            Uploading...
          </>
        ) : (
          "Upload Song"
        )}
      </Button>
    </Box>
  );
};

export default UploadSong;
