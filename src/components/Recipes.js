import React from "react";
import Recipe from "./Recipe";
import { Grid, Box } from "@material-ui/core";

const Recipes = ({ recipes, loading }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" m={3}>
        <h2>Loading...</h2>
      </Box>
    );
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="flex-start"
      spacing={6}
    >
      {!recipes.length ? (
        <h1>No recipes found!</h1>
      ) : (
        recipes.map((recipe) => {
          return (
            <Recipe
              key={recipe.idMeal}
              id={recipe.idMeal}
              name={recipe.strMeal}
              thumbnail={recipe.strMealThumb}
            />
          );
        })
      )}
    </Grid>
  );
};

export default Recipes;
