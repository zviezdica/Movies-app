import { createContext } from "react";

interface FilterState {
  genres: { id: string; name: string }[];
  release_date_start: number;
  release_date_end: number;
  language: string;
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
    language: "f",
  },
  setFilterState: () => ({
    genres: [],
    release_date_start: 0,
    release_date_end: 0,
    language: "f",
  }),
});
