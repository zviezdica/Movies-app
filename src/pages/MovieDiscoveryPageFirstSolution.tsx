import { ConstructionOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import MoviesList from "../components/discovery/MoviesList";

import getAPIData from "../helpers/getAPIData";

export interface Movie {
  id: number;
  title: string;
  img: string;
}

interface AllMovies {
  upcoming: Movie[];
  popular: {
    [key: string]: Movie[];
  };
}

const MovieDiscoveryPage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<{
    [key: string]: Movie[];
  }>({});
  const [allMovies, setAllMovies] = useState<AllMovies>();

  let upcomingArr: Movie[] = [];
  let popularMoviesObj: { [key: string]: any } = {};

  const getUpcomingMovies = () => {
    const apiQuery = "movie/upcoming?";

    getAPIData(apiQuery).then((res) => {
      const { results } = res;
      results.forEach((movie: any) => {
        upcomingArr.push({
          id: movie["id"],
          title: movie["title"],
          img: movie["poster_path"],
        });
        // setUpcomingMovies(upcomingArr);
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

    genres.forEach((genre) => {
      const { id, name } = genre;
      const aditional = `&page=1&with_genres=${id}`;

      getAPIData(apiQuery, aditional).then((res) => {
        console.log(res);
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
    // setPopularMovies(popularMoviesObj);
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

  useEffect(() => {
    if (upcomingMovies.length > 0 && Object.keys(popularMovies).length > 0) {
      setAllMovies({ upcoming: upcomingMovies, popular: popularMovies });
      console.log(allMovies);
    }
  }, []);

  const showPopularMoviesByGenre = () => {
    if (allMovies?.popular) {
      return Object.keys(allMovies.popular).map((genre) => {
        return (
          <MoviesList key={genre} movies={popularMovies[genre]} title={genre} />
        );
      });
    }
  };

  return (
    <>
      {allMovies?.upcoming != undefined && allMovies?.upcoming.length > 0 && (
        <MoviesList movies={allMovies.upcoming} title="Upcoming movies" />
      )}
      {allMovies?.popular != undefined &&
        Object.keys(allMovies.popular).length > 0 &&
        showPopularMoviesByGenre()}
    </>
  );
};

export default MovieDiscoveryPage;
