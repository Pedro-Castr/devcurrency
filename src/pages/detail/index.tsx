import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CoinDetail } from "../../components/coinDetail";
import { Loading } from "../../components/loading";
import { getCoin } from "../../services/coinCap";

import { type CoinFormatted } from "../../types/coin";

export function Detail() {
  const [coin, setCoin] = useState<CoinFormatted>();
  const [loading, setLoading] = useState(true);

  const { cripto } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCoin() {
      if (!cripto) {
        navigate("/");
        return;
      }

      try {
        const data = await getCoin(cripto);
        setCoin(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCoin();
  }, [cripto, navigate]);

  if (loading || !coin) {
    return <Loading frase={"Carregando detalhes da moeda..."} />;
  }

  return <CoinDetail coin={coin} />;
}
