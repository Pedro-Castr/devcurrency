import { Link } from "react-router-dom";

import styles from "./header.module.css";
import logo from "../../assets/logo.svg";

export function Header() {
  return (
    <header className={styles.container}>
      <Link to="/">
        <img src={logo} alt="Logo DevCurrency" />
      </Link>

      <nav className={styles.nav}>
        <Link to="/sobre">Sobre</Link>
      </nav>
    </header>
  );
}
