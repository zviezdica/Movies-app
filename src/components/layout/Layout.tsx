import React, { useState } from "react";

import { Container } from "react-bootstrap";

import Navigation from "../navigation/Navigation";
import { FilterContext, FilterState } from "../../contexts/FilterContext";

type Props = {
  children: React.ReactElement;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [filterOptions, setFilterOptions] = useState<FilterState>({
    genres: [],
    release_date_start: 1900,
    release_date_end: 2022,
  });

  return (
    <>
      <Navigation />
      <Container>
        <FilterContext.Provider
          value={{
            filterState: filterOptions,
            setFilterState: setFilterOptions,
          }}
        >
          <main className="py-5">{children}</main>
        </FilterContext.Provider>
      </Container>
    </>
  );
};

export default Layout;
