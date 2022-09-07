import React, { useState, useRef, useContext } from "react";
import GenreOption from "./GenreOption";
import { FilterContext } from "../../../contexts/FilterContext";
import useClickOutside from "../../../helpers/clickOutside";

const GenresFilter: React.FC<{ genres: { id: string; name: string }[] }> = ({
  genres,
}) => {
  const [genresWindowOpened, setGenresWindowOpened] = useState(false);
  const { filterState } = useContext(FilterContext);
  const genresWindowRef = useRef<HTMLDivElement>(null);
  useClickOutside(genresWindowRef);

  const openGenresWindow = () => {
    setGenresWindowOpened(true);
    genresWindowRef.current?.classList.remove("hide");
  };

  const showGenres = () => {
    return genres.map((genre) => {
      const { id } = genre;
      return <GenreOption key={`genre-option-${id}`} genre={genre} />;
    });
  };

  return (
    <div className="position-relative">
      <div onClick={openGenresWindow}>
        <p
          className={`me-4 fs-6 cursor-pointer ${
            filterState.genres.length > 0
              ? "text-white fw-bold"
              : "text-secondary"
          }`}
        >
          Genres
        </p>
      </div>
      {genresWindowOpened && (
        <div
          ref={genresWindowRef}
          className="filter-window position-absolute bg-primary p-3 rounded"
        >
          <p className="fs-5 text-white">Genres</p>
          <div className="flex flex-wrap justify-content-between">
            {showGenres()}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenresFilter;
