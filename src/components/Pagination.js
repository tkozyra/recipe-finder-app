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
    return <div></div>;
  }

  return (
    <Box display="flex" justifyContent="center" my={5}>
      <Pag
        size="small"
        count={numberOfPages}
        page={page}
        onChange={handleChange}
        color="secondary"
      />
    </Box>
  );
};

export default Pagination;
