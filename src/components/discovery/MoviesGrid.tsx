import React, { useState, useEffect } from "react";
import getAPIData from "../../helpers/getAPIData";
import MovieCard from "./MovieCard";

const MoviesGrid: React.FC<{ aditional: string }> = ({ aditional }) => {
  const [movies, setMovies] = useState([]);
  const apiQuery = "discover/movie?";

  const getMovies = async () => {
    return getAPIData(apiQuery, aditional).then((res) => {
      res.results.length && setMovies(res.results);
    });
  };

  const displayMovies = () => {
    return movies.map((movie) => {
      const { id, title, poster_path } = movie;
      const movieData = { id, title, img: poster_path };
      return (
        <div
          key={`{filter-${id}${Math.random()}}`}
          className="m-2 d-inline-block"
        >
          <MovieCard movie={movieData} />
        </div>
      );
    });
  };

  useEffect(() => {
    getMovies();
  }, [aditional]);

  return <>{displayMovies()}</>;
};

export default MoviesGrid;
