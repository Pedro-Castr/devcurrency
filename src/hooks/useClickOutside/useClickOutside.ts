import { useEffect, useRef } from "react";

export function useClickOutside(onCloseSuggestions: () => void) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onCloseSuggestions();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCloseSuggestions]);

  return wrapperRef;
}
