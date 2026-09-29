import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { TickerDetail } from "../../components/ticker-table/tickerDetail";
import { Loading } from "../../components/ui/loading";
import { getTicker } from "../../services/brapi";
import { useLocalStorageState } from "../../hooks/useLocalStorageState/useLocalStorageState";

import type { FormatedTickerQuoteProps } from "../../types/ticker";

export function Detail() {
  const [ticker, setTicker] = useState<FormatedTickerQuoteProps>();
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useLocalStorageState<string[]>(
    "favorites",
    [],
  );

  const { tickerParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTicker() {
      if (!tickerParam) {
        navigate("/");
        return;
      }

      try {
        const data = await getTicker(tickerParam);
        setTicker(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTicker();
  }, [tickerParam, navigate]);

  function handleFavorite(symbol: string) {
    setFavorites((prev) =>
      prev.includes(symbol)
        ? prev.filter((item) => item !== symbol)
        : [...prev, symbol],
    );
  }

  if (loading || !ticker) {
    return <Loading />;
  }

  const isFavorite = favorites.includes(ticker.symbol);

  return (
    <TickerDetail
      ticker={ticker}
      isFavorite={isFavorite}
      onToggleFavorite={() => handleFavorite(ticker.symbol)}
    />
  );
}
