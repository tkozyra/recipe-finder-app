import React, { useState, useEffect } from "react";
import Recipes from "./Recipes";
import Pagination from "./Pagination";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Button, Box } from "@material-ui/core";

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

const URL_RECIPES = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

const RecipeFilters = () => {
  const classes = useStyles();

  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const res = await fetch(URL_RECIPES).then((response) => response.json());
      setRecipes(res.meals);
      setLoading(false);
    };

    fetchRecipes();

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
    let url = URL_RECIPES + `${ingredient}`;
    setLoading(true);

    await fetch(url)
      .then((response) => response.json())
      .then(({ meals }) => {
        setRecipes(meals || []);
      });
    setLoading(false);
    paginate(1);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const ingredientString = ingredient.replace(" ", "_").toLowerCase();
    filterRecipes(ingredientString);
  }

  //Pagination
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
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
          <Button type="submit" variant="contained" color="primary">
            Filter
          </Button>
        </Box>
      </form>

      {/* Recipe grid */}
      <Recipes recipes={currentRecipes} loading={loading} />
      {/* Pagination */}
      <Pagination
        elementsPerPage={recipesPerPage}
        totalElements={recipes.length}
        paginate={paginate}
        contentReloaded={loading}
      />
    </Box>
  );
};

export default RecipeFilters;
