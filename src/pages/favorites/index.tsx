import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import { useLocalStorageState } from "../../hooks/useLocalStorageState/useLocalStorageState";
import { getTicker } from "../../services/brapi";
import { Loading } from "../../components/ui/loading";
import type { FormatedTickerQuoteProps } from "../../types/ticker";

import styles from "./favorites.module.css";

export function Favorites() {
  const [favorites] = useLocalStorageState<string[]>("favorites", []);
  const [tickers, setTickers] = useState<FormatedTickerQuoteProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (favorites.length === 0) {
        setTickers([]);
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          favorites.map((symbol) => getTicker(symbol)),
        );

        setTickers(results);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [favorites]);

  if (loading) {
    return <Loading />;
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Nenhum favorito ainda</p>
        <p className={styles.emptyText}>
          Favorite um ativo na página de detalhes pra vê-lo aqui.
        </p>
        <Link to="/" className={styles.emptyLink}>
          Ver ativos
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Favoritos</h1>
        <Link to="/" className={styles.back}>
          <BsArrowLeft size={16} />
          Voltar
        </Link>
      </div>

      <div className={styles.grid}>
        {tickers.map((ticker) => {
          const isProfit = ticker.regularMarketChange > 0;

          return (
            <Link
              key={ticker.symbol}
              to={`/detail/${ticker.symbol}`}
              className={styles.card}
            >
              <img
                className={styles.logo}
                src={ticker.logourl}
                alt={`Logo de ${ticker.longName}`}
              />

              <div className={styles.info}>
                <strong className={styles.symbol}>{ticker.symbol}</strong>
                <span className={styles.name}>{ticker.longName}</span>
              </div>

              <div className={styles.priceInfo}>
                <strong className={styles.price}>
                  {ticker.formatedRegularMarketPrice}
                </strong>
                <span className={isProfit ? styles.profit : styles.loss}>
                  {ticker.formatedRegularMarketChangePercent}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
