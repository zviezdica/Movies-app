import React, { useEffect, useState } from "react";

import UpcomingAndPopular from "../components/discovery/UpcomingAndPopular";
import Filter from "../components/discovery/Filter";
import getAPIData from "../helpers/getAPIData";

export interface Movie {
  id: number;
  title: string;
  img: string;
}

const MovieDiscoveryPage = () => {
  const [genres, setGenres] = useState<{ [key: string]: string }[]>([]);
  const [filterMode, setFilterMode] = useState(false);

  const getGenres = async () => {
    const apiQuery = "genre/movie/list?";
    return getAPIData(apiQuery).then((res) => {
      const resGenres = res.genres;
      setGenres(resGenres);
    });
  };

  useEffect(() => {
    getGenres();
  }, []);

  console.log(genres);

  return (
    <>
      <Filter />
      <UpcomingAndPopular genres={genres} />
    </>
  );
};

export default MovieDiscoveryPage;
