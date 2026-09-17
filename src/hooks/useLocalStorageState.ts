import { useState } from "react";

export function useLocalStorageState<T>(key: string, value: T) {
  const [savedValue, setSavedValue] = useState(() => {
    const response = localStorage.getItem(key);
    return response !== null ? (JSON.parse(response) as T) : value;
  });

  function setItem(newValue: T | ((current: T) => T)) {
    localStorage.setItem(key, JSON.stringify(newValue));
    setSavedValue(newValue);
  }

  return [savedValue, setItem] as const;
}
