import { createContext } from "react";

export type GenresState = { id: string; name: string }[];

type GenresUpdate = React.Dispatch<React.SetStateAction<GenresState>>;

export const GenresContext = createContext<{
  genresState: GenresState;
  setGenresState?: GenresUpdate;
}>({
  genresState: [{ id: "", name: "" }],
  setGenresState: () => [{ id: "", name: "" }],
});
