import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import IngredientChip from "./IngredientChip";

const IngredientList = ({ items, loading }) => {
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="row"
      flexWrap="wrap"
    >
      {!items.length ? (
        <CircularProgress />
      ) : (
        items.map((item) => {
          return <IngredientChip label={item} key={item} />;
        })
      )}
    </Box>
  );
};

export default IngredientList;
