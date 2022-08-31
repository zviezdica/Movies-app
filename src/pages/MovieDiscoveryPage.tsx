import React, { useEffect, useState } from "react";
import MoviesList from "../components/discovery/MoviesList";

import getAPIData from "../helpers/getAPIData";

export interface Movie {
  id: number;
  title: string;
  img: string;
}

const MovieDiscoveryPage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<{
    [key: string]: Movie[];
  }>({});

  const getUpcomingMovies = () => {
    const apiQuery = "movie/upcoming?";
    let upcomingArr: Movie[] = [];
    getAPIData(apiQuery).then((res) => {
      const { results } = res;
      results.forEach((movie: any) => {
        upcomingArr.push({
          id: movie["id"],
          title: movie["title"],
          img: movie["poster_path"],
        });
        setUpcomingMovies(upcomingArr);
      });
    });
  };

  const getGenres = () => {
    const apiQuery = "genre/movie/list?";
    return getAPIData(apiQuery);
  };

  const getPopularMovies = (genres: { [key: string]: string }[]) => {
    const apiQuery = "discover/movie?";
    let popularObj: { [key: string]: any } = {};
    let popularMoviesObj: { [key: string]: any } = {};
    genres.forEach((genre) => {
      const { id, name } = genre;
      const aditional = `&with_genres=${id}`;

      getAPIData(apiQuery, aditional).then((res) => {
        popularObj = { ...popularObj, [name]: res.results };

        Object.keys(popularObj).forEach((genre) => {
          const popularArr: Movie[] = [];
          popularObj[genre].forEach((movie: { [key: string]: any }) => {
            popularArr.push({
              id: movie["id"],
              title: movie["title"],
              img: movie["poster_path"],
            });
          });
          popularMoviesObj[genre] = popularArr;
        });
      });
    });
    setPopularMovies(popularMoviesObj);
  };

  useEffect(() => {
    const getPopularByGenres = async () => {
      const res = await getGenres();
      const genres = res.genres;
      if (genres.length) {
        getPopularMovies(genres);
      }
    };
    getUpcomingMovies();
    getPopularByGenres();
  }, []);

  const showPopularMoviesByGenre = () => {
    return Object.keys(popularMovies).map((genre) => {
      return (
        <MoviesList key={genre} movies={popularMovies[genre]} title={genre} />
      );
    });
  };

  return (
    <>
      {upcomingMovies.length > 0 && (
        <MoviesList movies={upcomingMovies} title="Upcoming movies" />
      )}
      {Object.keys(popularMovies).length > 0 && showPopularMoviesByGenre()}
    </>
  );
};

export default MovieDiscoveryPage;
