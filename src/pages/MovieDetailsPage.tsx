import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

import getAPIData from "../helpers/getAPIData";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState<{ [key: string]: any }>({});
  const { favoritesState, setFavoritesState } = useContext(FavoritesContext);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const baseUrlImg = "https://image.tmdb.org/t/p/";
  const baseUrlImgBig = baseUrlImg + "w400/";
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const apiQuery = `movie/${id}?`;
    getAPIData(apiQuery).then((details) => {
      setMovieDetails({
        ...details,
        imgSrc: baseUrlImgBig + details["poster_path"],
        year: details["release_date"].slice(0, 4),
      });
    });
  }, []);

  const {
    title,
    status,
    genres,
    overview,
    production_companies,
    production_countries,
    spoken_languages,
    imgSrc,
    year,
  } = movieDetails;

  const showProductionCompanies = () => {
    const baseUrlImgLogo = baseUrlImg + "w200/";
    return production_companies.map((company: { [key: string]: any }) => {
      const { id, logo_path } = company;
      if (!logo_path) return;
      return (
        <div
          key={id}
          className="logo bg-image me-4"
          style={{ backgroundImage: `url(${baseUrlImgLogo + logo_path})` }}
        ></div>
      );
    });
  };

  const showProductionCountries = () => {
    return production_countries.map((country: { [key: string]: any }) => {
      const { iso_3166_1, name } = country;
      return (
        <p key={iso_3166_1} className="me-3">
          {name}
        </p>
      );
    });
  };

  const showSpokenLanguages = () => {
    return spoken_languages.map((language: { [key: string]: any }) => {
      const { iso_639_1, english_name } = language;
      return (
        <p key={iso_639_1} className="me-3">
          {english_name}
        </p>
      );
    });
  };

  const showGenres = () => {
    return genres.map((genre: { [key: string]: any }) => {
      const { id, name } = genre;
      return (
        <p key={`genre-${id}`} className="me-3">
          {name}
        </p>
      );
    });
  };

  const toggleFavorites = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetEl = e.currentTarget;
    const currentFavorites = favoritesState.favorites;
    let newFavorites = [];
    if (currentFavorites.some((favorite) => favorite.id == id)) {
      newFavorites = currentFavorites.filter((favorite: any) => {
        return favorite["id"] !== id;
      });
      const filteredFavoritesStr = JSON.stringify(newFavorites);
      targetEl.classList.remove("favorite-true");
      targetEl.classList.add("favorite-false");
      localStorage.setItem("favorites", filteredFavoritesStr);
      setFavoritesState({ favorites: newFavorites });
    } else {
      if (id != undefined) {
        newFavorites = [...currentFavorites, { id, title }];
        const newFavoritesStr = JSON.stringify(newFavorites);
        targetEl.classList.remove("favorite-false");
        targetEl.classList.add("favorite-true");
        localStorage.setItem("favorites", newFavoritesStr);
        setFavoritesState({ favorites: newFavorites });
      }
    }
  };

  useEffect(() => {
    const currentFavorites = favoritesState.favorites;
    if (currentFavorites.some((favorite) => favorite.id == id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [favoritesState]);

  return (
    <div className="d-flex flex-wrap flex-md-nowrap">
      <div className="me-5 mb-5 mb-md-0">
        <picture>
          <source srcSet={imgSrc} />
          <img src={imgSrc} alt="movie" className=" swiper-lazy rounded-top" />
        </picture>

        <div className="d-flex justify-content-center align-items-center p-2 bg-primary rounded-bottom">
          <div className="d-flex flex-column justify-content-center align-items-center cursor-pointer">
            <div
              className={
                "details-fav-icon " +
                (isLiked ? "favorite-true" : "favorite-false")
              }
              onClick={toggleFavorites}
            >
              <FavoriteIcon className="fs-5  " />
            </div>
            <p className="text-white fs-7 mb-0">
              {isLiked ? "Remove from favorites" : "Add to favorites"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-grow-1  ">
        <div className="details-part">
          <h3 className="text-white fw-bold">
            {title} <span className="fs-5 text-secondary">({year})</span>
          </h3>
          {currentYear <= year && status && (
            <p className="text-secondary">{status}</p>
          )}
        </div>
        {production_companies && (
          <div className="details-part">
            <h6>production companies</h6>
            <div className="d-flex flex-wrap">{showProductionCompanies()}</div>
          </div>
        )}
        {overview && (
          <div className="details-part">
            <h6>synopsis</h6>
            <p className="text-secondary">{overview}</p>
          </div>
        )}
        {production_countries?.length && (
          <div className="details-part">
            <h6>
              {production_countries.length === 1
                ? "production country"
                : "production countries"}
            </h6>
            <div className="d-flex">{showProductionCountries()}</div>
          </div>
        )}
        {spoken_languages?.length && (
          <div className="details-part">
            <h6>
              {spoken_languages.length === 1
                ? "spoken language"
                : "spoken languages"}
            </h6>
            <div className="d-flex">{showSpokenLanguages()}</div>
          </div>
        )}
        {genres?.length && (
          <div className="details-part">
            <h6>{genres.length === 1 ? "genre" : "genres"}</h6>
            <div className="d-flex">{showGenres()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
