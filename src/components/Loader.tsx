import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed", // overlay on top of everything
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // semi-transparent black
        zIndex: 9999, // ensure it's on top
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default Loader;
