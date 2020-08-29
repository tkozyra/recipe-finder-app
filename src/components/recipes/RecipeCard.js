import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 360,
    maxWidth: "100vw",
  },
  media: {
    height: 180,
  },
});

export default function RecipeCard({ id, name, thumbnail }) {
  const classes = useStyles();

  return (
    <Grid item className={classes.root}>
      <Link to={`/recipes/details/${id}`}>
        <Card>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={thumbnail}
              title={name}
            />
            <CardContent>
              <Typography gutterBottom>{name}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
}
