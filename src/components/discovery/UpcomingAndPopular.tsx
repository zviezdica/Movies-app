import React, { useState, useEffect } from "react";

import MoviesList from "./MoviesList";
import getAPIData from "../../helpers/getAPIData";

import { Movie } from "../../pages/MovieDiscoveryPage";

interface AllMovies {
  upcoming: Movie[];
  popular: {
    [key: string]: Movie[];
  };
}

const UpcomingAndPopular: React.FC<{ genres: { [key: string]: string }[] }> = ({
  genres,
}) => {
  const [allMovies, setAllMovies] = useState<AllMovies>();
  let upcomingMovies: Movie[] = [];
  let popularMovies: { [key: string]: any } = {};

  const getPopularMovies = async () => {
    const apiQuery = "discover/movie?";
    let popularObj: { [key: string]: any } = {};
    genres.forEach(async (genre) => {
      const { id, name } = genre;
      const aditional = `&page=1&with_genres=${id}`;
      return getAPIData(apiQuery, aditional).then((res) => {
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
          popularMovies[genre] = popularArr;
        });
      });
    });
    return popularMovies;
  };

  const promiseUpcomingMovies = new Promise((resolve, reject) => {
    const getUpcomingMovies = async () => {
      const apiQuery = "movie/upcoming?";
      return getAPIData(apiQuery).then((res) => {
        const { results } = res;
        results.forEach((movie: any) => {
          upcomingMovies.push({
            id: movie["id"],
            title: movie["title"],
            img: movie["poster_path"],
          });
        });
        return upcomingMovies;
      });
    };
    resolve(getUpcomingMovies());
  });

  const promisePopularMovies = new Promise((resolve, reject) => {
    const getPopularByGenres = async () => {
      if (genres.length) {
        const res = await getPopularMovies();
        return res;
      }
    };
    resolve(getPopularByGenres());
  });

  const getAllMovies = async () => {
    const res = await Promise.all([
      promiseUpcomingMovies,
      promisePopularMovies,
    ]);
    if (res[0] != undefined && res[1] != undefined) {
      const upcoming = res[0] as Movie[];
      const popular = res[1] as {
        [key: string]: Movie[];
      };
      setAllMovies({ upcoming: upcoming, popular: popular });
    }
  };

  useEffect(() => {
    getAllMovies();
  }, [genres]);

  // const showPopularMoviesByGenre = () => {
  //   if (allMovies?.popular) {
  //     return Object.keys(allMovies.popular).map((genre) => {
  //       return (
  //         <MoviesList
  //           key={genre}
  //           movies={allMovies.popular[genre]}
  //           title={genre}
  //         />
  //       );
  //     });
  //   }
  // };

  return (
    <>
      {/* {allMovies?.upcoming != undefined && allMovies?.upcoming.length > 0 && (
        <MoviesList
          movies={allMovies.upcoming}
          title="Upcoming movies"
          apiQuery="movie/upcoming?"
        />
      )}
      {allMovies?.popular != undefined &&
        Object.keys(allMovies.popular).length > 0 &&
        showPopularMoviesByGenre()} */}
    </>
  );
};

export default UpcomingAndPopular;
