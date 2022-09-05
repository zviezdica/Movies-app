import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Movie } from "../../pages/MovieDiscoveryPage";
import { Link } from "react-router-dom";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const [image, setImage] = useState("");
  const { id, title, img } = movie;
  const baseUrl = "https://image.tmdb.org/t/p/w200/";
  const imgSrc = baseUrl + img;

  useEffect(() => {
    img && setImage(img);
  });

  const goToMovieDetails = (id: number, title: string) => {};

  return (
    <Link to={"/details/" + id}>
      <div className="d-inline-block movie-card position-relative">
        {img && (
          <picture>
            <source srcSet={imgSrc} />
            <img src={imgSrc} alt="movie" className="swiper-lazy rounded" />
          </picture>
        )}
        <FavoriteIcon className="position-absolute fs-2 cursor-pointer" />
      </div>
      <div className="swiper-lazy-preloader"></div>
    </Link>
  );
};

export default MovieCard;
