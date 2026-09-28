import { Link } from "react-router-dom";

import type { FormatedTickerProps } from "../../../types/ticker";
import styles from "./tickerRow.module.css";

interface TickerRowProps {
  ticker: FormatedTickerProps;
}

export function TickerRow({ ticker }: TickerRowProps) {
  return (
    <tr className={styles.tr}>
      <td className={styles.tdLabel}>
        <div className={styles.name}>
          <img
            className={styles.logo}
            src={ticker.logo}
            alt={`Logo da ${ticker.name}`}
          />

          <Link to={`/detail/${ticker.stock}?type=${ticker.type}`}>
            {ticker.stock} | {ticker.name}
          </Link>
        </div>
      </td>

      <td className={styles.tdLabel}>{ticker.formatedClose}</td>

      {ticker.type === "stock" && (
        <td className={styles.tdLabel}>{ticker.formatedMarketCap}</td>
      )}

      <td className={styles.tdLabel}>{ticker.formatedVolume}</td>

      <td className={styles.tdLabel}>
        <span
          className={
            Number(ticker.change) > 0 ? styles.tdProfit : styles.tdLoss
          }
        >
          {ticker.formatedChange}
        </span>
      </td>
    </tr>
  );
}
