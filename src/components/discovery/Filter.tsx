import React, { useState } from "react";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Filter = () => {
  const [filterOpened, setFilterOpened] = useState(false);

  const toggleFilterWindow = () => {
    setFilterOpened(!filterOpened);
  };

  return (
    <div
      className="position-relative d-flex justify-content-end "
      onClick={toggleFilterWindow}
    >
      <div className="d-inline-flex text-secondary cursor-pointer">
        <FilterAltIcon className="fs-2" />
        <p className="ms-2 fs-5">Filters</p>
      </div>
      {filterOpened && (
        <div className="filter-window position-absolute bg-primary rounded"></div>
      )}
    </div>
  );
};

export default Filter;
