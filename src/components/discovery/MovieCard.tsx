import React from "react";

const MovieCard = () => {
  const baseUrl = "https://image.tmdb.org/t/p/w200/";
  return (
    <>
      <div className="movie-card">
        <picture>
          <source data-srcset="https://image.tmdb.org/t/p/w200/h8uVeIF58QQJy4XChEXhcexvuoi.jpg" />
          <img
            data-src="https://image.tmdb.org/t/p/w200/h8uVeIF58QQJy4XChEXhcexvuoi.jpg"
            alt="movie"
            className="swiper-lazy rounded"
          />
        </picture>
      </div>
      <div className="swiper-lazy-preloader"></div>
    </>
  );
};

export default MovieCard;
