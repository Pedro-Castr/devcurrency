import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import type { FormatedTickerProps } from "../../../types/ticker";
import styles from "./tickerDetail.module.css";

interface TickerDetailProps {
  ticker: FormatedTickerProps;
}

export function TickerDetail({ ticker }: TickerDetailProps) {
  const isProfit = Number(ticker.change) > 0;
  const tickerTypeLabel = ticker.type === "fund" ? "FII" : "Ação";

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.back}>
        <BsArrowLeft size={16} />
        Voltar
      </Link>

      <section className={styles.hero}>
        <img
          className={styles.logo}
          src={ticker.logo}
          alt={`Logo da ${ticker.name}`}
        />

        <div className={styles.heroInfo}>
          <span className={styles.badge}>{tickerTypeLabel}</span>
          <h1 className={styles.name}>{ticker.name}</h1>
          <span className={styles.stock}>{ticker.stock}</span>
        </div>
      </section>

      <section className={styles.priceSection}>
        <div>
          <span className={styles.priceLabel}>Preço</span>
          <strong className={styles.price}>{ticker.formatedClose}</strong>
        </div>

        <span className={isProfit ? styles.profit : styles.loss}>
          {ticker.formatedChange}
        </span>
      </section>

      <section className={styles.statsGrid}>
        {ticker.type === "stock" && (
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Valor de mercado</span>
            <strong className={styles.statValue}>
              {ticker.formatedMarketCap}
            </strong>
          </div>
        )}
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Volume</span>
          <strong className={styles.statValue}>{ticker.formatedVolume}</strong>
        </div>
      </section>

      <section className={styles.classification}>
        {ticker.sector && <span className={styles.tag}>{ticker.sector}</span>}
        {ticker.subsector && (
          <span className={styles.tag}>{ticker.subsector}</span>
        )}
      </section>
    </div>
  );
}
