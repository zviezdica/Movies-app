import { useState, useEffect, useContext } from "react";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { NavDropdown } from "react-bootstrap";

const Favorites = () => {
  const { favoritesState, setFavoritesState } = useContext(FavoritesContext);
  const [currentFavorites, setCurrentFavorites] = useState([]);

  const getFavoritesLS = () => {
    const favoritesLS = localStorage.getItem("favorites");
    if (favoritesLS === null) return;
    else {
      setCurrentFavorites(JSON.parse(favoritesLS));
    }
  };

  const displayFavorites = () => {
    return favoritesState.favorites.map((favoriteMovie) => {
      const { id, title } = favoriteMovie;
      return (
        <NavDropdown.Item
          key={`favorite-${id}`}
          href={`/details/${id}`}
          className="text-secondary"
        >
          {title}
        </NavDropdown.Item>
      );
    });
  };

  useEffect(() => {
    getFavoritesLS();
  }, []);

  useEffect(() => {
    setFavoritesState({ favorites: currentFavorites });
  }, [currentFavorites]);

  return (
    <NavDropdown
      title="My favorites"
      id="favoritesDropdown"
      className="rounded border-0 bg-primary text-secondary me-3 me-xl-4"
    >
      {displayFavorites()}
      {favoritesState.favorites.length === 0 && (
        <p className="text-secondary p-2 mb-0">Nothing to show</p>
      )}
    </NavDropdown>
  );
};

export default Favorites;
