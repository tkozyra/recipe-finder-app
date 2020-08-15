import React from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  typography: {
    fontSize: 12,
  },
  root: {
    width: 350,
  },
  media: {
    height: 200,
  },
});

export default function Recipe({ name, thumbnail }) {
  const classes = useStyles();

  return (
    <Grid item>
      <Card spacing={5} className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={thumbnail} title={name} />
          <CardContent>
            <Typography gutterBottom>{name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
