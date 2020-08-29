import React from "react";
import IngredientCard from "./IngredientCard";
import { Container, Grid, Box, CircularProgress } from "@material-ui/core";

const Ingredients = ({ ingredients, loading }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" m={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Grid container direction="row" justify="center" alignItems="center">
        {!ingredients.length ? (
          <h1>No ingredients found!</h1>
        ) : (
          ingredients.map((ingredient) => {
            return (
              <IngredientCard
                key={ingredient.idIngredient}
                id={ingredient.idIngredient}
                name={ingredient.strIngredient}
                thumbnail={ingredient.thumbnail}
              />
            );
          })
        )}
      </Grid>
    </Container>
  );
};

export default Ingredients;
