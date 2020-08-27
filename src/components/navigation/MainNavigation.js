import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import KitchenIcon from "@material-ui/icons/Kitchen";
import FastfoodIcon from "@material-ui/icons/Fastfood";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    letterSpacing: 2,
  },
}));

const MainNavigation = () => {
  const classes = useStyles();
  const mobile = useMediaQuery("(max-width:600px)");

  if (mobile) {
    return <div></div>;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Recipe finder
          </Typography>
          <Button
            color="inherit"
            className={classes.menuButton}
            startIcon={<HomeIcon />}
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            className={classes.menuButton}
            startIcon={<FastfoodIcon />}
            component={RouterLink}
            to="/recipes"
          >
            Recipes
          </Button>
          <Button
            color="inherit"
            className={classes.menuButton}
            startIcon={<KitchenIcon />}
            component={RouterLink}
            to="/ingredients"
          >
            Ingredients
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainNavigation;
