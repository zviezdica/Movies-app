import { generateKeySync, generatePrimeSync } from "crypto";
import React, { useEffect, useState } from "react";
import MoviesList from "../components/discovery/MoviesList";

import getAPIData from "../helpers/getAPIData";

export interface Movie {
  id: number;
  img: string;
}

const MovieDiscoveryPage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState([]);
  const [popularMovies, setPopularMovies] = useState({});

  const getUpcomingMovies = () => {
    const apiQuery = "movie/upcoming?";
    let upcomingArr: Movie[] = [];
    getAPIData(apiQuery).then((res) => {
      const { results } = res;
      // console.log(results);
      results.forEach((movie: any) => {
        upcomingArr.push({ id: movie["id"], img: movie["poster_path"] });
        setUpcomingMovies(upcomingArr);
      });
    });
  };

  const getGenres = () => {
    const apiQuery = "genre/movie/list?";
    getAPIData(apiQuery).then((res) => setGenres(res.genres));
  };

  const getPopularMovies = () => {
    const apiQuery = "movie/popular?";
    let popularObj = {};
    genres.forEach((genre) => {
      const { id, name } = genre;
      const aditional = `&with_genres=${id}`;
      getAPIData(apiQuery, aditional).then((res) => {
        popularObj = { ...popularObj, [name]: res.results };
        setPopularMovies(popularObj);
      });
    });
  };

  useEffect(() => {
    getUpcomingMovies();
    getGenres();
  }, []);

  useEffect(() => {
    if (genres.length) {
      getPopularMovies();
    }
  }, [genres]);

  console.log(upcomingMovies);
  return (
    <>
      <MoviesList />
    </>
  );
};

export default MovieDiscoveryPage;
