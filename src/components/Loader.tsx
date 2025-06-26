import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: (theme) => theme.zIndex.modal + 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="inherit" />
      <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default Loader;
