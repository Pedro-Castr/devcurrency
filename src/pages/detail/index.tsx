import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { TickerDetail } from "../../components/ticker-table/tickerDetail";
import { Loading } from "../../components/ui/loading";
import { getTicker } from "../../services/brapi";

import type { FormatedTickerQuoteProps } from "../../types/ticker";

export function Detail() {
  const [ticker, setTicker] = useState<FormatedTickerQuoteProps>();
  const [loading, setLoading] = useState(true);

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

  if (loading || !ticker) {
    return <Loading />;
  }

  return <TickerDetail ticker={ticker} />;
}
