import React, { useEffect, useState } from "react";

import Filter from "../components/discovery/filter/Filter";
import MoviesList from "../components/discovery/MoviesList";
import getAPIData from "../helpers/getAPIData";
import { GenresContext } from "../contexts/GenresContext";
import { GenresState } from "../contexts/GenresContext";

export interface Movie {
  id: number;
  title: string;
  img: string;
}

const MovieDiscoveryPage = () => {
  const [genres, setGenres] = useState<GenresState>([]);
  const [filterMode, setFilterMode] = useState(false);

  const getGenres = async () => {
    const apiQuery = "genre/movie/list?";
    return getAPIData(apiQuery).then((res) => {
      const resGenres = res.genres;
      setGenres(resGenres);
    });
  };

  const showByGenre = () => {
    return genres.map((genre) => {
      const { id, name } = genre;
      return (
        <MoviesList key={`{genre-${id}}`} title={name} id={id}></MoviesList>
      );
    });
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <>
      <GenresContext.Provider value={{ genresState: genres }}>
        <Filter genres={genres} />
        <MoviesList title="upcoming" upcoming={true} />
        {genres.length > 0 && showByGenre()}
      </GenresContext.Provider>
    </>
  );
};

export default MovieDiscoveryPage;
