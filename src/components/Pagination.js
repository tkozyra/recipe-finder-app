import React, { useState, useEffect } from "react";
import { Pagination as Pag } from "@material-ui/lab";
import { Box } from "@material-ui/core";

const Pagination = ({
  elementsPerPage,
  totalElements,
  paginate,
  contentReloaded,
}) => {
  const numberOfPages = Math.ceil(totalElements / elementsPerPage);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (contentReloaded) {
      setPage(1);
    }
  }, [contentReloaded]);

  const handleChange = (event, value) => {
    setPage(value);
    paginate(value);
  };

  if (totalElements <= 0) {
    return <Box></Box>;
  }

  return (
    <Box display="flex" justifyContent="center" my={5}>
      <Pag
        count={numberOfPages}
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </Box>
  );
};

export default Pagination;
