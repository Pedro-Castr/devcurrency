import { Link } from "react-router-dom";

import { type CoinFormatted } from "../../types/coin";
import styles from "./coinRow.module.css";

interface CoinRowProps {
  coin: CoinFormatted;
}

export function CoinRow({ coin }: CoinRowProps) {
  return (
    <tr className={styles.tr}>
      <td className={styles.tdLabel}>
        <div className={styles.name}>
          <img
            className={styles.logo}
            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}2@2x.png`}
            alt={`Logo da ${coin.name}`}
          />

          <Link to={`/detail/${coin.id}`}>
            {coin.name} | {coin.symbol}
          </Link>
        </div>
      </td>

      <td className={styles.tdLabel}>{coin.formattedMarket}</td>

      <td className={styles.tdLabel}>{coin.formattedPrice}</td>

      <td className={styles.tdLabel}>{coin.formattedVolume}</td>

      <td className={styles.tdLabel}>
        <span
          className={
            Number(coin.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss
          }
        >
          {Number(coin.changePercent24Hr).toFixed(2)}
        </span>
      </td>
    </tr>
  );
}
