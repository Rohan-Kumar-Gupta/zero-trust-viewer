import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" component="div">
          Zero Trust App Viewer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
