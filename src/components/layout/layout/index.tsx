import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useLocalStorageState } from "../../../hooks/useLocalStorageState/useLocalStorageState";

import { Header } from "../header";
import type { ThemeTypes } from "../../../types/theme";

export function Layout() {
  const [theme, setTheme] = useLocalStorageState<ThemeTypes>("theme", "light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Outlet />
    </>
  );
}
