import { useState } from "react";
import { Link } from "react-router-dom";
import { BsSun, BsMoon, BsList, BsX } from "react-icons/bs";

import { Logo } from "../logo";
import type { ThemeTypes } from "../../../types/theme";

import styles from "./header.module.css";

interface HeaderProps {
  theme: ThemeTypes;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((current) => !current);
  }

  return (
    <header className={styles.container}>
      <Link to="/" className={styles.logoLink} onClick={closeMenu}>
        <Logo className={styles.logo} />
      </Link>

      <div className={styles.sider}>
        <nav
          className={
            isMenuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav
          }
        >
          <Link to="/about" className={styles.navLink} onClick={closeMenu}>
            Sobre
          </Link>
          <Link to="/favorites" className={styles.navLink} onClick={closeMenu}>
            Favoritos
          </Link>
        </nav>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeButton}
            onClick={onToggleTheme}
            aria-label="Alternar tema"
          >
            <span key={theme} className={styles.iconWrapper}>
              {theme === "light" ? <BsMoon size={28} /> : <BsSun size={28} />}
            </span>
          </button>
          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <BsX size={26} /> : <BsList size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
}
