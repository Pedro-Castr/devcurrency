import { useState } from "react";

export function useLocalStorageState<T>(key: string, value: T) {
  const [savedValue, setSavedValue] = useState(() => {
    const response = localStorage.getItem(key);
    return response !== null ? (JSON.parse(response) as T) : value;
  });

  function setItem(newValue: T | ((prev: T) => T)) {
    setSavedValue((prev) => {
      const resolvedValue =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(prev)
          : newValue;

      localStorage.setItem(key, JSON.stringify(resolvedValue));
      return resolvedValue;
    });
  }

  return [savedValue, setItem] as const;
}
