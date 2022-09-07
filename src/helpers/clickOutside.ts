import React, { RefObject, useEffect } from "react";

interface Props {
  (
    ref?: RefObject<HTMLElement>,
    setSearchValue?: React.Dispatch<React.SetStateAction<string>>,
    setSearchResults?: React.Dispatch<React.SetStateAction<never[]>>
  ): void;
}

const useClickOutside: Props = (ref, setSearchValue, setSearchResults) => {
  useEffect(() => {
    function handleClickOutside(e: globalThis.MouseEvent) {
      const target = e.target as HTMLElement;
      if (ref?.current && !ref.current.contains(target)) {
        setSearchValue && setSearchValue("");
        setSearchResults && setSearchResults([]);
        ref.current.classList.add("hide");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export default useClickOutside;
