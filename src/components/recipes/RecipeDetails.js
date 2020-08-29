import React, { useState, useEffect } from "react";
import { URL_BASE } from "../../api";
import { useParams, Link } from "react-router-dom";
import IngredientList from "../ingredients/IngredientsList";
import { Container, Typography, Grid, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 500,
  },
  media: {
    width: "100%",
    height: "100%",
  },
});

const RecipeDetails = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    loading: true,
  });
  let { id } = useParams();

  const getIngredients = (data) => {
    const ingredients = [];
    for (let i = 1; i < 20; i++) {
      if (data[`strIngredient${i}`]) {
        ingredients.push(
          `${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    return ingredients;
  };

  useEffect(() => {
    const requestRecipeDetails = async () => {
      setState({ loading: true });
      const url = URL_BASE + `lookup.php?i=${id}`;
      const data = await fetch(url).then((response) => response.json());
      const details = data.meals[0];
      setState({
        loading: false,
        name: details.strMeal,
        thumbnail: details.strMealThumb,
        instructions: details.strInstructions,
        category: details.strCategory,
        area: details.strArea,
        source: details.strSource,
        ingredients: getIngredients(details),
      });
    };
    requestRecipeDetails();
  }, [id]);

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" p={3}>
            <Typography variant="h2">{state.name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <Box>
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={state.thumbnail}
                title={state.name}
              />
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} lg={2}>
          <Box mb={3}>
            <Typography variant="h4">Ingredients</Typography>
          </Box>
          <IngredientList items={state.ingredients} loading={state.loading} />
        </Grid>
        <Grid item xs={12}>
          <Box mb={3}>
            <Typography variant="h4">Instructions</Typography>
          </Box>
          <Typography>{state.instructions}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to="/">
            <Button variant="contained" color="primary">
              Main page
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipeDetails;
