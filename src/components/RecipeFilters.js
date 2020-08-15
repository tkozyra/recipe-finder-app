import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Button, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  container: {
    margin: theme.spacing(5),
  },
}));

const URL_INGREDIENTS =
  "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

const RecipeFilters = () => {
  const classes = useStyles();

  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");

  useEffect(() => {
    filterRecipes("");

    fetch(URL_INGREDIENTS)
      .then((response) => response.json())
      .then((data) => {
        const ingredientsStrings = data.meals
          .map(({ strIngredient }) => strIngredient)
          //remove duplicates
          .reduce(
            (unique, item) =>
              unique.includes(item) ? unique : [...unique, item],
            []
          )
          .sort();
        setIngredients(ingredientsStrings);
      });
  }, []);

  async function filterRecipes(ingredient) {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    await fetch(url)
      .then((response) => response.json())
      .then(({ meals }) => {
        setRecipes(meals || []);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const ingredientString = ingredient.replace(" ", "_").toLowerCase();
    filterRecipes(ingredientString);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink>Main ingredient</InputLabel>
          <NativeSelect
            disabled={!ingredients.length}
            id="ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            onBlur={(e) => setIngredient(e.target.value)}
          >
            <option value="">Any</option>
            {ingredients.map((ingredient) => (
              <option key={ingredient} value={ingredient}>
                {ingredient}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      <RecipeList recipes={recipes} />
    </Container>
  );
};

export default RecipeFilters;
