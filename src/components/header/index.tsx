import { Link } from "react-router-dom";

import type { ThemeTypes } from "../../types/theme";
import { Logo } from "../../assets/logo";
import styles from "./header.module.css";
import { BsMoon, BsSun } from "react-icons/bs";

interface HeaderProps {
  theme: ThemeTypes;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className={styles.container}>
      <Link to="/">
        <Logo className={styles.logo} />
      </Link>

      <div className={styles.sider}>
        <nav className={styles.nav}>
          <Link to="/sobre">Sobre</Link>
        </nav>

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
      </div>
    </header>
  );
}
