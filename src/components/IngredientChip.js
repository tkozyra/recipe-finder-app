import React from "react";
import { Box, Chip } from "@material-ui/core";

const IngredientChip = ({ label }) => {
  return (
    <Box m={1} ml={0}>
      <Chip color="primary" label={label} />
    </Box>
  );
};

export default IngredientChip;
