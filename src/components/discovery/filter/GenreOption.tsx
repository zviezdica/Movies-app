import React, { useState, useRef, useEffect, useContext } from "react";
import { FilterContext } from "../../../contexts/FilterContext";
import { GenresContext } from "../../../contexts/GenresContext";

const GenreOption: React.FC<{ genre: { id: string; name: string } }> = ({
  genre,
}) => {
  const [isGenreSelected, setIsGenreSelected] = useState(false);
  const { filterState, setFilterState } = useContext(FilterContext);

  const { name, id } = genre;
  const genreRef = useRef<HTMLParagraphElement>(null);

  const handleSelectedGenre = () => {
    if (!isGenreSelected) {
      setIsGenreSelected(true);
      if (filterState.genres.length === 0) {
        setFilterState({
          ...filterState,
          genres: [id],
        });
      } else {
        setFilterState({
          ...filterState,
          genres: [...filterState.genres, id],
        });
      }
    } else {
      setIsGenreSelected(false);
      const filteredGenres = filterState.genres.filter((genre) => genre != id);
      setFilterState({ ...filterState, genres: filteredGenres });
    }
  };

  useEffect(() => {
    if (filterState.genres.includes(id)) {
      genreRef.current?.classList.add("active");
    } else {
      genreRef.current?.classList.remove("active");
    }
  }, [filterState]);

  return (
    <p
      ref={genreRef}
      key={`select-genre-${id}`}
      className="option text-secondary d-inline-block cursor-pointer rounded p-1 mb-1 me-1"
      onClick={handleSelectedGenre}
    >
      {name}
    </p>
  );
};

export default GenreOption;
