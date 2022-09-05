import { createContext } from "react";

export interface FilterState {
  genres: string[];
  release_date_start: number;
  release_date_end: number;
}

type FilterUpdate = React.Dispatch<React.SetStateAction<FilterState>>;

export const FilterContext = createContext<{
  filterState: FilterState;
  setFilterState: FilterUpdate;
}>({
  filterState: {
    genres: [],
    release_date_start: 0,
    release_date_end: 0,
  },
  setFilterState: () => ({
    genres: [],
    release_date_start: 0,
    release_date_end: 0,
  }),
});
