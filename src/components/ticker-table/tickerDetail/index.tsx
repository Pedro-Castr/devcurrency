import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import { RangeBar } from "../../ui/rangeBar";
import type { FormatedTickerQuoteProps } from "../../../types/ticker";

import styles from "./tickerDetail.module.css";

interface TickerDetailProps {
  ticker: FormatedTickerQuoteProps;
}

export function TickerDetail({ ticker }: TickerDetailProps) {
  const isProfit = ticker.regularMarketChange > 0;

  const updatedAt = new Date(ticker.regularMarketTime).toLocaleTimeString(
    "pt-BR",
    { hour: "2-digit", minute: "2-digit" },
  );

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.back}>
        <BsArrowLeft size={16} />
        Voltar
      </Link>

      <section className={styles.hero}>
        <img
          className={styles.logo}
          src={ticker.logourl}
          alt={`Logo de ${ticker.longName}`}
        />

        <div className={styles.heroInfo}>
          <h1 className={styles.name}>{ticker.longName}</h1>
          <span className={styles.symbol}>{ticker.symbol}</span>
        </div>
      </section>

      <section className={styles.priceSection}>
        <div>
          <span className={styles.priceLabel}>Preço</span>
          <strong className={styles.price}>
            {ticker.formatedRegularMarketPrice}
          </strong>
        </div>

        <span className={isProfit ? styles.profit : styles.loss}>
          {ticker.formatedRegularMarketChangePercent}
        </span>
      </section>

      <section className={styles.rangesSection}>
        <RangeBar
          label="Faixa do dia"
          low={ticker.regularMarketDayLow}
          high={ticker.regularMarketDayHigh}
          current={ticker.regularMarketPrice}
          lowFormatted={ticker.formatedRegularMarketDayLow}
          highFormatted={ticker.formatedRegularMarketDayHigh}
        />

        <RangeBar
          label="52 semanas"
          low={ticker.fiftyTwoWeekLow}
          high={ticker.fiftyTwoWeekHigh}
          current={ticker.regularMarketPrice}
          lowFormatted={ticker.formatedFiftyTwoWeekLow}
          highFormatted={ticker.formatedFiftyTwoWeekHigh}
        />
      </section>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Abertura</span>
          <strong className={styles.statValue}>
            {ticker.formatedRegularMarketOpen}
          </strong>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Fech. anterior</span>
          <strong className={styles.statValue}>
            {ticker.formatedRegularMarketPreviousClose}
          </strong>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Volume</span>
          <strong className={styles.statValue}>
            {ticker.formatedRegularMarketVolume}
          </strong>
        </div>

        {ticker.priceEarnings != null && (
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Valor de mercado</span>
            <strong className={styles.statValue}>
              {ticker.formatedMarketCap}
            </strong>
          </div>
        )}

        {ticker.priceEarnings != null && (
          <div className={styles.statCard}>
            <span className={styles.statLabel}>P/L</span>
            <strong className={styles.statValue}>
              {ticker.formatedPriceEarnings}x
            </strong>
          </div>
        )}

        {ticker.earningsPerShare != null && (
          <div className={styles.statCard}>
            <span className={styles.statLabel}>LPA</span>
            <strong className={styles.statValue}>
              {ticker.formatedEarningsPerShare}
            </strong>
          </div>
        )}
      </section>

      <p className={styles.updatedAt}>Atualizado às {updatedAt}</p>
    </div>
  );
}
