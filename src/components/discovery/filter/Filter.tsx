import React, { useState } from "react";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Form from "react-bootstrap/Form";
import GenresFilter from "./GenresFilter";
import { FilterContext } from "../../../contexts/FilterContext";

const Filter: React.FC<{ genres: { id: string; name: string }[] }> = ({
  genres,
}) => {
  const [filterOptions, setFilterOptions] = useState({
    genres: [{ id: "", name: "" }],
    release_date_start: 0,
    release_date_end: 0,
    language: "",
  });

  return (
    <div className="d-flex align-items-center">
      <div className="d-inline-flex text-secondary me-5">
        <FilterAltIcon className="fs-2" />
        <p className="ms-2 fs-5">Filters</p>
      </div>
      <FilterContext.Provider
        value={{ filterState: filterOptions, setFilterState: setFilterOptions }}
      >
        <GenresFilter genres={genres} />
      </FilterContext.Provider>
    </div>
  );
};

export default Filter;
