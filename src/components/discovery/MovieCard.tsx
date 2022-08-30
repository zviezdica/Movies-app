import React from "react";

import BookmarkIcon from "@mui/icons-material/Bookmark";

import { Movie } from "../../pages/MovieDiscoveryPage";
import { Link } from "react-router-dom";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { id, title, img } = movie;
  const baseUrl = "https://image.tmdb.org/t/p/w200/";
  const imgSrc = baseUrl + img;

  const goToMovieDetails = (id: number, title: string) => {};

  return (
    <Link to={"/details/" + movie.id}>
      <div className="d-block movie-card position-relative">
        <picture>
          <source data-srcset={imgSrc} />
          <img data-src={imgSrc} alt="movie" className="swiper-lazy rounded" />
        </picture>
        <BookmarkIcon className="position-absolute start-0 fs-1 cursor-pointer" />
      </div>
      <div className="swiper-lazy-preloader"></div>
    </Link>
  );
};

export default MovieCard;
