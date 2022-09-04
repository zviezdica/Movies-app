import React, { useState } from "react";
import GenreOption from "./GenreOption";

const GenresFilter: React.FC<{ genres: { id: string; name: string }[] }> = ({
  genres,
}) => {
  const [genresWindowOpened, setGenresWindowOpened] = useState(false);

  const toggleGenresWindow = () => {
    setGenresWindowOpened(!genresWindowOpened);
  };

  const showGenres = () => {
    return genres.map((genre) => {
      const { id } = genre;
      return <GenreOption key={`genre-option-${id}`} genre={genre} />;
    });
  };

  return (
    <div className="position-relative">
      <div onClick={toggleGenresWindow}>
        <p className="me-4 fs-6 text-secondary ">Genres</p>
      </div>
      {genresWindowOpened && (
        <div className="filter-window position-absolute bg-primary p-3">
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
