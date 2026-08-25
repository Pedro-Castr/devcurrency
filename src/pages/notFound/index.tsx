import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import styles from "./notFound.module.css";

export function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.ticker}>
          PAGE404
          <span className={styles.loss}>▼ -100,00%</span>
        </span>

        <h1 className={styles.code}>404</h1>

        <h2 className={styles.title}>Ativo não encontrado</h2>

        <p className={styles.description}>
          A página que você buscou não existe ou saiu de listagem. Confira o
          endereço digitado ou volte para acompanhar os ativos disponíveis.
        </p>

        <Link to="/" className={styles.button}>
          <BsArrowLeft size={16} />
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
}
