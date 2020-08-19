import React from "react";
import RecipeFilters from "./components/RecipeFilters";
import RecipeDetails from "./components/RecipeDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, Box } from "@material-ui/core";

const App = () => {
  return (
    <Box>
      <CssBaseline />
      <Router>
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
