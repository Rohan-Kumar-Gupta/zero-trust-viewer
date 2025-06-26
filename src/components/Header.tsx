import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h5"
          noWrap
          component="div"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            textAlign: "center",
            width: "100%",
          }}
        >
          Zero Trust App Viewer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
