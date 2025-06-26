import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PolicyIcon from "@mui/icons-material/Gavel";
import AssetIcon from "@mui/icons-material/Devices";
import EventIcon from "@mui/icons-material/Event";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const navItems = [
  { text: "Policies", path: "/policies", icon: <PolicyIcon /> },
  { text: "Assets", path: "/assets", icon: <AssetIcon /> },
  { text: "Events", path: "/events", icon: <EventIcon /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        height: "calc(100vh - 64px)",
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Box sx={{ mt: 2 }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
