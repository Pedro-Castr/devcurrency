import type { CoinFormatted } from "../../types/coin";
import styles from "./coinDetail.module.css";

interface CoinDetailProps {
  coin: CoinFormatted;
}

export function CoinDetail({ coin }: CoinDetailProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{coin.name}</h1>
      <h1 className={styles.center}>{coin.symbol}</h1>

      <section className={styles.content}>
        <img
          className={styles.logo}
          src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}2@2x.png`}
          alt={`Logo da ${coin.name}`}
        />

        <h1>
          {coin.name} | {coin.symbol}
        </h1>

        <p>
          <strong>Preço: </strong> {coin.formattedPrice}
        </p>

        <p>
          <strong>Mercado: </strong> {coin.formattedMarket}
        </p>

        <p>
          <strong>Volume: </strong> {coin.formattedVolume}
        </p>

        <p>
          <strong>Mudança: </strong>
          <span
            className={
              Number(coin.changePercent24Hr) > 0 ? styles.profit : styles.loss
            }
          >
            {Number(coin.changePercent24Hr).toFixed(2)}
          </span>
        </p>
      </section>
    </div>
  );
}
