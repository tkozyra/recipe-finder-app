import React from "react";
import RecipeCard from "./RecipeCard";
import { Container, Grid, Box, CircularProgress } from "@material-ui/core";

const Recipes = ({ recipes, loading }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" m={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={4}
      >
        {!recipes.length ? (
          <h1>No recipes found!</h1>
        ) : (
          recipes.map((recipe) => {
            return (
              <RecipeCard
                key={recipe.idMeal}
                id={recipe.idMeal}
                name={recipe.strMeal}
                thumbnail={recipe.strMealThumb}
              />
            );
          })
        )}
      </Grid>
    </Container>
  );
};

export default Recipes;
