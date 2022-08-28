import React from "react";

import BookmarkIcon from "@mui/icons-material/Bookmark";

const MovieCard = () => {
  const baseUrl = "https://image.tmdb.org/t/p/w200/";
  return (
    <>
      <div className="movie-card position-relative">
        <picture>
          <source data-srcset="https://image.tmdb.org/t/p/w200/h8uVeIF58QQJy4XChEXhcexvuoi.jpg" />
          <img
            data-src="https://image.tmdb.org/t/p/w200/h8uVeIF58QQJy4XChEXhcexvuoi.jpg"
            alt="movie"
            className="swiper-lazy rounded"
          />
        </picture>
        <BookmarkIcon className="position-absolute start-0 fs-1 cursor-pointer" />
      </div>
      <div className="swiper-lazy-preloader"></div>
    </>
  );
};

export default MovieCard;
