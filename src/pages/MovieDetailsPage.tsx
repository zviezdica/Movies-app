import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "react-bootstrap/Image";

import getAPIData from "../helpers/getAPIData";

interface MovieDetails {
  title: string;
}

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState<{ [key: string]: any }>({});
  const { id } = useParams();
  const baseUrlImg = "https://image.tmdb.org/t/p/";
  const baseUrlImgBig = baseUrlImg + "w400/";
  console.log(id);

  useEffect(() => {
    const apiQuery = `movie/${id}?`;
    getAPIData(apiQuery).then((details) => {
      setMovieDetails({
        ...details,
        imgSrc: baseUrlImgBig + details["poster_path"],
        date: details["release_date"].slice(0, 4),
      });
    });
  }, []);

  const {
    title,
    status,
    genres,
    original_language,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    spoken_languages,
    imgSrc,
    date,
  } = movieDetails;
  console.log(production_companies);

  const showProductionCompanies = () => {
    const baseUrlImgLogo = baseUrlImg + "w200/";
    return production_companies.map((company: { [key: string]: any }) => {
      const { id, logo_path, name } = company;
      if (!logo_path) return;
      return (
        <div
          key={id}
          className="logo bg-image me-3"
          style={{ backgroundImage: `url(${baseUrlImgLogo + logo_path})` }}
        ></div>
      );
    });
  };

  console.log(imgSrc);
  return (
    <div className="d-flex">
      <div className="me-5">
        <picture>
          <source srcSet={imgSrc} />
          <img src={imgSrc} alt="movie" className="swiper-lazy rounded" />
        </picture>
        <div className="d-flex justify-content-center align-items-center p-2 bg-secondary">
          <div className="d-flex flex-column justify-content-center align-items-center cursor-pointer">
            <FavoriteIcon className="fs-2 text-white " />
            <p className="text-white fs-7">Add to favorites</p>
          </div>
        </div>
      </div>
      <div className="flex-grow-1">
        <h3 className="text-white fw-bold pb-4">
          {title} <span className="fs-5 text-secondary">({date})</span>
        </h3>
        {movieDetails.production_companies && (
          <>
            <h6 className="text-uppercase text-secondary">
              production companies
            </h6>
            <div className="d-flex flex-wrap">{showProductionCompanies()}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
