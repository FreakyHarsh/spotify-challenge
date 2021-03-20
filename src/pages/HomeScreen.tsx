import {
  AppBar,
  createStyles,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import logo from "../assets/images/logo.png";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

import { RootState } from "..";
import { Home } from "../components/Home";
import { spotifyUserType } from "../types/spotifyUserType";

export const HomeScreen = () => {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState("Home");

  const user = useSelector((state: RootState) => state.userState.user as spotifyUserType);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <List>
        <ListItem>
          <img src={logo} alt='Spotify Logo' style={{ width: "100%" }} />
        </ListItem>
        {["Home", "Search", "Logout"].map((text, index) => (
          <ListItem
            button
            key={text}
            selected={text === selectedTab}
            className={classes.select}
            onClick={() => {
              setSelectedTab(text);
              mobileOpen && setMobileOpen(!mobileOpen);
              history.push(text.toLowerCase());
            }}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => (window as any).document.body : undefined;

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Spotify Challenge
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    content: {
      // flexGrow: 1,
      padding: theme.spacing(3),
      width: "100%",
    },
    toolbar: theme.mixins.toolbar,
    select: {
      "&.MuiListItem-root.Mui-selected": {
        backgroundColor: theme.palette.primary.contrastText,
        color: theme.palette.primary.main,
      },
    },
  })
);
