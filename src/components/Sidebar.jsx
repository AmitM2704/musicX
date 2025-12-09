import {
  Drawer, Toolbar, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

const drawerWidth = 240;

const Sidebar = ({ onSearchClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      {isMobile && (
        <IconButton onClick={toggleDrawer} sx={{ position: "fixed", top: 10, left: 10, zIndex: 2000 }}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "gray",
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>Dashboard</Typography>
        </Toolbar>
        <List>
          {[
            { text: "Home", icon: <HomeIcon /> },
            { text: "Search", icon: <SearchIcon />, action: onSearchClick },
            { text: "List", icon: <QueueMusicIcon /> },
            { text: "About", icon: <InfoIcon /> }
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={item.action || (() => {})}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
