import { useEffect, useState, useContext } from "react";

import Filter from "../components/discovery/filter/Filter";
import MoviesList from "../components/discovery/MoviesList";
import FilteredMoviesDisplay from "../components/discovery/FilteredMoviesDisplay";
import getAPIData from "../helpers/getAPIData";
import { FilterContext } from "../contexts/FilterContext";

export interface Movie {
  id: number;
  title: string;
  img: string;
}

type Genre = {
  id: string;
  name: string;
};

const MovieDiscoveryPage = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [filterMode, setFilterMode] = useState(false);
  const { filterState, setFilterState } = useContext(FilterContext);

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
    setFilterState({
      genres: [],
      release_date_start: 1900,
      release_date_end: 2022,
    });
  }, []);

  useEffect(() => {
    if (
      filterState.genres.length === 0 &&
      filterState.release_date_start === 1900 &&
      filterState.release_date_end === 2022
    ) {
      setFilterMode(false);
    } else {
      setFilterMode(true);
    }
  }, [filterState]);

  return (
    <>
      <Filter genres={genres} />
      {!filterMode && <MoviesList title="upcoming" upcoming={true} />}
      {!filterMode && genres.length > 0 && showByGenre()}
      {filterMode && <FilteredMoviesDisplay />}
    </>
  );
};

export default MovieDiscoveryPage;
