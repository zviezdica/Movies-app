import React, { useState, useContext } from "react";
import { FilterContext } from "../../../contexts/FilterContext";
import { GenresContext } from "../../../contexts/GenresContext";

const GenreOption: React.FC<{ genre: { id: string; name: string } }> = ({
  genre,
}) => {
  const [isGenreSelected, setIsGenreSelected] = useState(false);
  const { filterState, setFilterState } = useContext(FilterContext);

  const { name, id } = genre;
  console.log(filterState);

  const handleSelectedGenre = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    const selectedGenre = e.target as HTMLElement;
    if (!isGenreSelected) {
      selectedGenre.classList.add("active");
      setIsGenreSelected(true);
      if (filterState.genres[0].id === "") {
        setFilterState({
          ...filterState,
          genres: [{ id, name }],
        });
      } else {
        setFilterState({
          ...filterState,
          genres: [...filterState.genres, { id, name }],
        });
      }
    } else {
      selectedGenre.classList.remove("active");
      setIsGenreSelected(false);
      const filteredGenres = filterState.genres.filter(
        (genre) => genre.id != id
      );
      setFilterState({ ...filterState, genres: filteredGenres });
    }
  };

  return (
    <p
      key={`select-genre-${id}`}
      className="option text-secondary d-inline-block cursor-pointer rounded p-1 mb-1 me-1"
      onClick={handleSelectedGenre}
    >
      {name}
    </p>
  );
};

export default GenreOption;
