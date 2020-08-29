import React from "react";
import { Typography, makeStyles, Avatar, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 160,
    width: 100,
    margin: theme.spacing(3),
    borderRadius: "1%",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  image: {
    height: 100,
    width: 100,
  },
  name: {
    textAlign: "center",
    marginTop: theme.spacing(1),
    textDecoration: "none",
  },
}));

export default function IngredientCard({ id, name, thumbnail }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Link className={classes.link} to={`/ingredients/details/${id}`}>
        <Avatar
          alt={name}
          src={thumbnail}
          className={classes.image}
          variant="rounded"
        />
        <Typography className={classes.name}>{name}</Typography>
      </Link>
    </Box>
  );
}
