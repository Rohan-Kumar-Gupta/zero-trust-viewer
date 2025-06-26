import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { ReactNode, useState } from "react";
import Header from "../components/Header";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header onMenuClick={handleDrawerToggle} />

      <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
        {/* Sidebar for mobile */}
        {isMobile ? (
          <Sidebar
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        ) : (
          // Sidebar for desktop
          <Sidebar
            variant="permanent"
            open
          />
        )}

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
