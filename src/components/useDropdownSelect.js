import React, { useState } from "react";
import { FormControl, InputLabel, NativeSelect, Box } from "@material-ui/core";

const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown = () => {
    return (
      <Box m={3}>
        <FormControl>
          <InputLabel shrink>{label}</InputLabel>
          <NativeSelect
            disabled={!options.length}
            id={id}
            value={state}
            onChange={(e) => setState(e.target.value)}
            onBlur={(e) => setState(e.target.value)}
          >
            <option value="">Any</option>
            {options.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Box>
    );
  };

  return [state, Dropdown, setState];
};

export default useDropdown;
