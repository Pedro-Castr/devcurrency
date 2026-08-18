import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { CoinProps } from "../home";

import styles from "./detail.module.css";

interface ResponseData {
  data: CoinProps;
}

interface ErrorData {
  error: string;
}

type DataProps = ResponseData | ErrorData;

export function Detail() {
  const { cripto } = useParams();
  const navigate = useNavigate();

  const [coin, setCoin] = useState<CoinProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCoin() {
      try {
        fetch(
          `https://rest.coincap.io/v3/assets/${cripto}?apiKey=f6c7b530fa30adb164ab88c5b2d47b5e38573d084dfd3ed64cd5e436ab4de470`,
        )
          .then((response) => response.json())
          .then((data: DataProps) => {
            if ("error" in data) {
              navigate("/");
              return;
            }

            const price = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            });

            const priceCompact = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
            });

            const resultData = {
              ...data.data,
              formatedPrice: price.format(Number(data.data.priceUsd)),
              formatedMarket: priceCompact.format(
                Number(data.data.marketCapUsd),
              ),
              formatedVolume: priceCompact.format(
                Number(data.data.volumeUsd24Hr),
              ),
            };

            setCoin(resultData);
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    }

    getCoin();
  }, [cripto]);

  if (loading || !coin) {
    return (
      <div className={styles.container}>
        <h1 className={styles.center}>Carregando Detalhes</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{coin?.name}</h1>
      <h1 className={styles.center}>{coin?.symbol}</h1>

      <section className={styles.content}>
        <img
          className={styles.logo}
          src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}2@2x.png`}
          alt="Logo da moeda"
        />

        <h1>
          {coin?.name} | {coin?.symbol}
        </h1>

        <p>
          <strong>Preço: </strong> {coin?.formatedPrice}
        </p>

        <a href="">
          <strong>Mercado: </strong> {coin.formatedMarket}
        </a>

        <a href="">
          <strong>Volume: </strong> {coin.formatedVolume}
        </a>

        <a href="">
          <strong>Mudança: </strong>
          <span
            className={
              Number(coin?.changePercent24Hr) > 0 ? styles.profit : styles.loss
            }
          >
            {Number(coin?.changePercent24Hr).toFixed(2)}
          </span>
        </a>
      </section>
    </div>
  );
}

export default Detail;
