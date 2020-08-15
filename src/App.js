import React from "react";
import "./App.scss";
import RecipeFilters from "./components/RecipeFilters";
import { Container } from "@material-ui/core";

const App = () => {
  return (
    <Container>
      <RecipeFilters />
    </Container>
  );
};

export default App;
