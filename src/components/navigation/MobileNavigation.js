import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import KitchenIcon from "@material-ui/icons/Kitchen";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 1,
  },
}));

const MobileNavigation = () => {
  const classes = useStyles();
  const mobile = useMediaQuery("(max-width:600px)");
  const [value, setValue] = useState(0);

  if (!mobile) {
    return <div></div>;
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={RouterLink}
        to="/"
        label="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        component={RouterLink}
        to="/recipes"
        label="Recipes"
        icon={<FastfoodIcon />}
      />
      <BottomNavigationAction
        component={RouterLink}
        to="/ingredients"
        label="Ingredients"
        icon={<KitchenIcon />}
      />
    </BottomNavigation>
  );
};

export default MobileNavigation;
