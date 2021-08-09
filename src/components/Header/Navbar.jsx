import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import HomeIcon from "@material-ui/icons/Home";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import { Routes } from "../../constants/routes";
import { FavCountContext, SearchContext } from "../../pages/HomePage/HomePage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  logout: {
    color: "white",
    margin: "10px",
    backgroundColor: "#0049A2",
  },
  favButton: {
    color: "white",
    backgroundColor: "orange",
    "&:hover": {
      backgroundColor: "darkorange",
    },
  },
  homeIcon: {
    transition: "0.4s",
    color: "white",
    "&:hover": {
      color: "#FFA500",
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const favCount = useContext(FavCountContext);
  const handleSearchInput = useContext(SearchContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to={Routes.movies.url}>
              <HomeIcon className={classes.homeIcon} fontSize="large" />
            </Link>
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}></div>
            <InputBase
              onChange={handleSearchInput}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Link to={Routes.favoritePage.url}>
            <Badge color="secondary" badgeContent={favCount} max={10}>
              <Button className={classes.favButton}>Favorite</Button>
            </Badge>
          </Link>
          <Link to={Routes.loginPage.url}>
            <Button className={classes.logout}>Log Out</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

