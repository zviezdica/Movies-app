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
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(e: globalThis.MouseEvent) {
      const target = e.target as HTMLElement;
      if (ref?.current && !ref.current.contains(target)) {
        console.log("You clicked outside of me!");
        setSearchValue && setSearchValue("");
        setSearchResults && setSearchResults([]);
        ref.current.classList.add("hide");
      }
    }
    console.log(ref);
    document.addEventListener("mousedown", handleClickOutside);
    console.log("dodajem");

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      console.log("mičem");
    };
  }, [ref]);
};

export default useClickOutside;
