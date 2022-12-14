import React, { useRef, useState } from "react";
import getAPIData from "../../helpers/getAPIData";

import SearchIcon from "@mui/icons-material/Search";
import { Form, InputGroup } from "react-bootstrap";

import useClickOutside from "../../helpers/clickOutside";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchResultsRef = useRef<HTMLDivElement>(null);
  useClickOutside(searchResultsRef, setSearchValue, setSearchResults);

  const handleSearch = (e: React.ChangeEvent) => {
    const targetInput = e.target as HTMLInputElement;
    setSearchValue(targetInput.value);
    if (targetInput.value) {
      const apiQuery = "search/multi?query=" + targetInput.value + "&";
      getAPIData(apiQuery).then((res) => setSearchResults(res.results));
    } else setSearchResults([]);
  };

  const showSearchResults = () => {
    if (searchResults.length === 0) return;

    return searchResults.map((searchResult) => {
      const { id, name, original_title } = searchResult;
      return (
        <a
          href={`/details/${id}`}
          className="d-block link-secondary text-decoration-none py-1"
        >
          {name || original_title}
        </a>
      );
    });
  };

  return (
    <InputGroup className="position-relative rounded w-50">
      <InputGroup.Text className="border-0 bg-primary">
        <SearchIcon className="text-secondary" />
      </InputGroup.Text>
      <Form.Control
        placeholder="movies, tv shows, people"
        aria-label="search movies, tv shows, people"
        className="border-0 rounded-end bg-primary text-secondary shadow-none"
        value={searchValue}
        onChange={handleSearch}
      ></Form.Control>
      <div
        ref={searchResults.length > 0 || searchValue ? searchResultsRef : null}
        className={`search-results ${
          searchResults.length > 0 || searchValue ? "show" : "hide"
        } w-100 p-2 rounded position-absolute start-0 bg-primary text-secondary`}
      >
        {searchResults.length > 0 && showSearchResults()}
        {searchResults.length === 0 && (
          <p className="text-secondary mb-0">No results</p>
        )}
      </div>
      {/* )} */}
    </InputGroup>
  );
};

export default SearchInput;
