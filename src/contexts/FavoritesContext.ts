import { createContext } from "react";

export interface FavoritesState {
  favorites:
    | {
        id: string;
        title: string;
      }[]
    | [];
}

type FavoritesUpdate = React.Dispatch<React.SetStateAction<FavoritesState>>;

export const FavoritesContext = createContext<{
  favoritesState: FavoritesState;
  setFavoritesState: FavoritesUpdate;
}>({
  favoritesState: {
    favorites: [],
  },
  setFavoritesState: () => ({
    favorites: [],
  }),
});
