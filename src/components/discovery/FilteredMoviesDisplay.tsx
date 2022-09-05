import React, { useState, useRef, useEffect, useContext } from "react";
import getAPIData from "../../helpers/getAPIData";
import { FilterContext } from "../../contexts/FilterContext";
import MoviesGrid from "./MoviesGrid";

const FilteredMoviesDisplay = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [aditionalInfo, setAditionalInfo] = useState("");
  const [moviesGrids, setMoviesGrids] = useState<any[]>([]);

  const { filterState } = useContext(FilterContext);
  const genresStr = filterState.genres.join(",");

  const filteredMoviesEl = useRef<HTMLDivElement>(null);
  const apiQuery = "discover/movie?";

  const getMoviesPages = async () => {
    return getAPIData(apiQuery, aditionalInfo).then((res) => {
      res.results.length && setPages(res.total_pages);
    });
  };

  useEffect(() => {
    window.onscroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;
      if (bottom) {
        const resPage = page + 1;
        setMoviesGrids([
          ...moviesGrids,
          <MoviesGrid
            key={`{page-${resPage}}`}
            aditional={`&page=${resPage}${aditionalInfo}`}
          />,
        ]);
        setPage(resPage);
      }
    };
  });

  const changeAditional = () => {
    let aditional =
      `&primary_release_date.gte=${filterState.release_date_start.toString()}-01-01` +
      `&primary_release_date.lte=${filterState.release_date_end.toString()}-12-31`;
    if (filterState.genres.length > 0) {
      aditional = `&with_genres=${genresStr}` + aditional;
    }
    setAditionalInfo(aditional);
  };

  useEffect(() => {
    changeAditional();
  }, [filterState]);

  useEffect(() => {
    changeAditional();
  }, []);

  useEffect(() => {
    getMoviesPages();
  }, [aditionalInfo]);

  useEffect(() => {
    getMoviesPages();
  }, []);

  useEffect(() => {
    // if (pages === 0) return;
    const gridsArr = [];
    if (pages > 0) {
      gridsArr.push(
        <MoviesGrid key={"page-1"} aditional={`&page=1${aditionalInfo}`} />
      );
    }
    if (pages > 1) {
      gridsArr.push(
        <MoviesGrid key={"page-2"} aditional={`&page=2${aditionalInfo}`} />
      );
    }
    setMoviesGrids(gridsArr);
  }, [aditionalInfo]);

  return (
    <div ref={filteredMoviesEl}>
      {moviesGrids}
      {pages === 0 && <p>no results</p>}
    </div>
  );
};

export default FilteredMoviesDisplay;
