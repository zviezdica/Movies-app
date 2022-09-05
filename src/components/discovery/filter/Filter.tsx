import React, { useState, useEffect, useContext } from "react";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import GenresFilter from "./GenresFilter";
import DateFilter from "./DateFilter";
import { FilterContext } from "../../../contexts/FilterContext";

const Filter: React.FC<{ genres: { id: string; name: string }[] }> = ({
  genres,
}) => {
  const [filtersActive, setFiltersActive] = useState(false);
  const { filterState, setFilterState } = useContext(FilterContext);

  const handleRemoveFilters = () => {
    setFilterState({
      genres: [],
      release_date_start: 1900,
      release_date_end: 2022,
    });
  };

  useEffect(() => {
    if (
      filterState.genres.length === 0 &&
      filterState.release_date_start === 1900 &&
      filterState.release_date_end === 2022
    ) {
      setFiltersActive(false);
    } else setFiltersActive(true);
  }, [filterState]);

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex">
        <div className="d-inline-flex text-secondary me-5">
          <FilterAltIcon className="fs-2" />
          <p className="ms-2 fs-5">Filters</p>
        </div>
        <GenresFilter genres={genres} />
        <DateFilter />
      </div>
      {filtersActive && (
        <div
          className="d-inline-flex text-white me-5 cursor-pointer"
          onClick={handleRemoveFilters}
        >
          <FilterAltOffIcon className="fs-3" />
          <p className="ms-2 fs-6">Remove filters</p>
        </div>
      )}
    </div>
  );
};

export default Filter;
