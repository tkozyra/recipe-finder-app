import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import Ingredients from "./Ingredients";
import { URL_INGREDIENTS } from "../../api";

const IngredientsView = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL_INGREDIENT_THUMBNAIL =
    "https://www.themealdb.com/images/ingredients/";

  useEffect(() => {
    const fetchIngredients = async (url) => {
      setLoading(true);
      const data = await fetch(url).then((response) => response.json());
      const ingredientsData = data.meals;
      ingredientsData.forEach((element) => {
        let ingredientThumbnailUrl =
          URL_INGREDIENT_THUMBNAIL + element.strIngredient + "-Small.png";
        element.thumbnail = ingredientThumbnailUrl;
      });
      setIngredients(ingredientsData);
      setLoading(false);
    };

    fetchIngredients(URL_INGREDIENTS);
  }, []);

  return (
    <div>
      <Box textAlign="center" m={3}>
        <Typography variant="h2" component="h2">
          Ingredients
        </Typography>
        <Ingredients ingredients={ingredients} loading={loading} />
      </Box>
    </div>
  );
};

export default IngredientsView;
