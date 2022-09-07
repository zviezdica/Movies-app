import React, { useEffect, useState, useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoritesContext } from "../../contexts/FavoritesContext";

import { Movie } from "../../pages/MovieDiscoveryPage";
import { Link } from "react-router-dom";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { favoritesState, setFavoritesState } = useContext(FavoritesContext);
  const { id, title, img } = movie;
  const baseUrl = "https://image.tmdb.org/t/p/w200/";
  const imgSrc = baseUrl + img;

  const toggleFavorites = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetEl = e.currentTarget;
    const currentFavorites = favoritesState.favorites;
    let newFavorites = [];
    if (currentFavorites.some((favorite) => favorite.id == id.toString())) {
      newFavorites = currentFavorites.filter((favorite: any) => {
        return favorite["id"] !== id.toString();
      });
      const filteredFavoritesStr = JSON.stringify(newFavorites);
      targetEl.classList.remove("favorite-true");
      targetEl.classList.add("favorite-false");
      localStorage.setItem("favorites", filteredFavoritesStr);
      setFavoritesState({ favorites: newFavorites });
    } else {
      newFavorites = [...currentFavorites, { id: id.toString(), title }];
      const newFavoritesStr = JSON.stringify(newFavorites);
      targetEl.classList.remove("favorite-false");
      targetEl.classList.add("favorite-true");
      localStorage.setItem("favorites", newFavoritesStr);
      setFavoritesState({ favorites: newFavorites });
    }
  };

  useEffect(() => {
    const currentFavorites = favoritesState.favorites;
    if (currentFavorites.some((favorite) => favorite.id == id.toString())) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [favoritesState]);

  return (
    <div className="position-relative  movie-card">
      <Link to={"/details/" + id}>
        <div className="d-inline-block">
          {img && (
            <picture>
              <source srcSet={imgSrc} />
              <img src={imgSrc} alt="movie" className="swiper-lazy rounded" />
            </picture>
          )}
        </div>
      </Link>
      <div
        onClick={toggleFavorites}
        className={
          "fav-icon position-absolute " +
          (isLiked ? "favorite-true" : "favorite-false")
        }
      >
        <FavoriteIcon className=" fs-2 cursor-pointer" />
      </div>
      <div className="swiper-lazy-preloader"></div>
    </div>
  );
};

export default MovieCard;
