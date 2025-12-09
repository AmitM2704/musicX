import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
    minWidth: 200
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  return (
    <AppBar position="static" sx={{ backgroundColor: "rgba(0, 0, 0, 1)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* App name */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
        </Typography>

        {/* Search bar toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2
         }}>
          {showSearch && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search songs..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}

          <IconButton color="inherit" onClick={() => setShowSearch(!showSearch)}>
            <SearchIcon />
          </IconButton>

          {/* Play / Pause
          <IconButton color="inherit" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
