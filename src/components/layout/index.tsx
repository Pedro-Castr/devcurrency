import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../header";
import type { ThemeTypes } from "../../types/theme";

export function Layout() {
  const [theme, setTheme] = useState<ThemeTypes>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : "light";
  });

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Outlet />
    </>
  );
}
