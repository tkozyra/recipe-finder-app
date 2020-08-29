import React from "react";
import RecipeFilters from "./components/recipes/RecipeFilters";
import RecipeDetails from "./components/recipes/RecipeDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, Box } from "@material-ui/core";
import MainNavigation from "./components/navigation/MainNavigation";
import MobileNavigation from "./components/navigation/MobileNavigation";
const App = () => {
  return (
    <Box paddingBottom={8}>
      <CssBaseline />
      <Router>
        <MainNavigation />
        <MobileNavigation />
        <Switch>
          <Route path="/recipes/details/:id">
            <RecipeDetails />
          </Route>
          <Route path="/">
            <RecipeFilters />
          </Route>
        </Switch>
      </Router>
    </Box>
  );
};

export default App;
