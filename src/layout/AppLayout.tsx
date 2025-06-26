import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { ReactNode } from "react";
import Header from "../components/Header";

type Props = {
  children: ReactNode;
};

const HEADER_HEIGHT = 64; // default MUI AppBar height

const AppLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Fixed Header */}
      <Header />

      {/* Below Header Layout */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          mt: '64px'//`${HEADER_HEIGHT}px`, // push below fixed AppBar
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            backgroundColor: "#f5f5f5",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            position: "fixed",
            top: '64px',//`${HEADER_HEIGHT}px`,
            left: 0,
            overflowY: "auto",
            borderRight: "1px solid #ddd",
            mt: '64px',
          }}
        >
          <Sidebar />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: 30, // leave space for sidebar
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
