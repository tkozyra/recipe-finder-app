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
    width: 350,
  },
  media: {
    height: 200,
  },
});

export default function Recipe({ id, name, thumbnail }) {
  const classes = useStyles();

  return (
    <Grid item>
      <Link to={`/recipes/details/${id}`}>
        <Card spacing={5} className={classes.root}>
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
