import { Link } from "react-router-dom";
import { BsArrowLeft, BsHeart } from "react-icons/bs";

import { RangeBar } from "../../ui/rangeBar";
import type { FormatedTickerQuoteProps } from "../../../types/ticker";

import styles from "./tickerDetail.module.css";

interface TickerDetailProps {
  ticker: FormatedTickerQuoteProps;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function TickerDetail({
  ticker,
  isFavorite,
  onToggleFavorite,
}: TickerDetailProps) {
  const isProfit = ticker.regularMarketChange > 0;

  const updatedAt = new Date(ticker.regularMarketTime).toLocaleTimeString(
    "pt-BR",
    { hour: "2-digit", minute: "2-digit" },
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.back}>
          <BsArrowLeft size={16} />
          Voltar
        </Link>

        <BsHeart
          size={28}
          onClick={onToggleFavorite}
          className={isFavorite ? styles.heartActive : styles.heart}
        />
      </div>

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
          <span
            className={styles.statLabel}
            data-tooltip="Preço da primeira negociação do dia"
          >
            Abertura
          </span>
          <strong className={styles.statValue}>
            {ticker.formatedRegularMarketOpen}
          </strong>
        </div>

        <div className={styles.statCard}>
          <span
            className={styles.statLabel}
            data-tooltip="Preço de fechamento do pregão anterior"
          >
            Fech. anterior
          </span>
          <strong className={styles.statValue}>
            {ticker.formatedRegularMarketPreviousClose}
          </strong>
        </div>

        <div className={styles.statCard}>
          <span
            className={styles.statLabel}
            data-tooltip="Quantidade financeira negociada no dia"
          >
            Volume
          </span>
          <strong className={styles.statValue}>
            {ticker.formatedRegularMarketVolume}
          </strong>
        </div>

        {ticker.priceEarnings != null && (
          <div className={styles.statCard}>
            <span
              className={styles.statLabel}
              data-tooltip="Valor total da empresa: preço da ação × quantidade de ações emitidas"
            >
              Valor de mercado
            </span>
            <strong className={styles.statValue}>
              {ticker.formatedMarketCap}
            </strong>
          </div>
        )}

        {ticker.priceEarnings != null && (
          <div className={styles.statCard}>
            <span
              className={styles.statLabel}
              data-tooltip="Preço dividido pelo lucro por ação — quanto menor, mais barata a ação em relação ao lucro que gera"
            >
              P/L
            </span>
            <strong className={styles.statValue}>
              {ticker.formatedPriceEarnings}x
            </strong>
          </div>
        )}

        {ticker.earningsPerShare != null && (
          <div className={styles.statCard}>
            <span
              className={styles.statLabel}
              data-tooltip="Lucro líquido dividido pela quantidade de ações — quanto de lucro corresponde a cada ação"
            >
              LPA
            </span>
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
