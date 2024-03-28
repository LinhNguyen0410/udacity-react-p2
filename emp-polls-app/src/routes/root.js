import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import LoginIcon from "@mui/icons-material/Login";
import PollIcon from "@mui/icons-material/Poll";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Outlet, Link, useNavigate, useNavigation, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthUser, setAuthUser } from "../features/authUser/authUserSlice";
import { Avatar } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Root() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();
  let navigation = useNavigation();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let authedUser = useSelector(selectAuthUser);

  const logout = (e) => {
    e.preventDefault();
    dispatch(setAuthUser(null));
    navigate("/", { state: { previousPath: location.pathname } });
  };

  if (navigation.state === "loading") {
    return (
      <Container maxWidth="sm">
        <Typography variant="h1">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Employee Polls App
          </Typography>
          {authedUser !== null && (
            <>
              <Avatar sx={{ bgcolor: "white", mr: "10px" }} alt={authedUser.avatarURL} src={authedUser.avatarURL} />
              <Typography variant="h6" component="span">
                {authedUser.name}
              </Typography>
            </>
          )}
          {authedUser !== null && (
            <Button variant="contained" sx={{ my: 1, mx: 1.5 }} onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"Login"} disablePadding>
            <ListItemButton component={Link} to={""} state={{ previousPath: location.pathname }}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={authedUser === null ? "Login" : "Switch User"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"home"} disablePadding>
            <ListItemButton
              component={Link}
              to={"/home"}
              state={{ previousPath: location.pathname }}
              disabled={authedUser === null}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"AddPoll"} disablePadding>
            <ListItemButton
              component={Link}
              to={"/add"}
              state={{ previousPath: location.pathname }}
              disabled={authedUser === null}>
              <ListItemIcon>
                <PollIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Poll"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"leaderboard"} disablePadding>
            <ListItemButton
              component={Link}
              to={"/leaderboard"}
              state={{ previousPath: location.pathname }}
              disabled={authedUser === null}>
              <ListItemIcon>
                <LeaderboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Leaderboard"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
