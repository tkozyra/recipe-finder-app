import React, { useState, useEffect } from "react";
import Recipes from "./Recipes";
import Pagination from "../Pagination";
import useDropdownSelect from "../../hooks/useDropdownSelect";
import {
  URL_BASE,
  URL_RECIPES,
  URL_INGREDIENTS,
  URL_CATEGORIES,
  URL_AREAS,
} from "../../api";
import { Button, Box } from "@material-ui/core";

const RecipeFilters = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredient, IngredientDropdownSelect] = useDropdownSelect(
    "Main ingredient",
    "",
    ingredients
  );
  const [category, CategoryDropdownSelect] = useDropdownSelect(
    "Category",
    "",
    categories
  );
  const [area, AreaDropdownSelect] = useDropdownSelect("Area", "", areas);
  const [loading, setLoading] = useState(false);

  // get recipes from api
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const res = await fetch(URL_RECIPES).then((response) => response.json());
      setRecipes(res.meals);
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  //get ingredients, categories and areas from api
  useEffect(() => {
    const fetchIngredients = async (url) => {
      const data = await fetch(url).then((response) => response.json());
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
    };
    const fetchCategories = async (url) => {
      const data = await fetch(url).then((response) => response.json());
      const categoriesStrings = data.meals
        .map(({ strCategory }) => strCategory)
        .sort();
      setCategories(categoriesStrings);
    };
    const fetchAreas = async (url) => {
      const data = await fetch(url).then((response) => response.json());
      const areasStrings = data.meals.map(({ strArea }) => strArea).sort();
      setAreas(areasStrings);
    };
    fetchIngredients(URL_INGREDIENTS);
    fetchCategories(URL_CATEGORIES);
    fetchAreas(URL_AREAS);
  }, []);

  async function filterRecipes(ingredient, category, area) {
    let url = URL_BASE + "filter.php?";
    let params = new URLSearchParams();
    if (!ingredient && !category && !area) {
      url += "i=";
    }
    if (ingredient) {
      params.append("i", ingredient);
    }
    if (category) {
      params.append("c", category);
    }
    if (area) {
      params.append("a", area);
    }
    url += params.toString();

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
    const categoryString = category.replace(" ", "_").toLowerCase();
    const areaString = area.replace(" ", "_").toLowerCase();
    filterRecipes(ingredientString, categoryString, areaString);
  }

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          mb={3}
        >
          {/* Filter dropdown selects */}
          <IngredientDropdownSelect />

          <CategoryDropdownSelect />

          <AreaDropdownSelect />

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
