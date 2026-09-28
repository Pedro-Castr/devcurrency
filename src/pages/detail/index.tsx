import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import { TickerDetail } from "../../components/ticker-table/tickerDetail";
import { Loading } from "../../components/ui/loading";
import { getTicker } from "../../services/brapi";

import type { FormatedTickerProps, StockTypes } from "../../types/ticker";

export function Detail() {
  const [ticker, setTicker] = useState<FormatedTickerProps>();
  const [loading, setLoading] = useState(true);

  const { tickerParam } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as StockTypes;
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCoin() {
      if (!tickerParam) {
        navigate("/");
        return;
      }

      try {
        const data = await getTicker(tickerParam, type);
        setTicker(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCoin();
  }, [tickerParam, type, navigate]);

  if (loading || !ticker) {
    return <Loading />;
  }

  return <TickerDetail ticker={ticker} />;
}
