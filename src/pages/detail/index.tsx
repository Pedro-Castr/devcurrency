import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CoinDetail from "../../components/coinDetail";
import Loading from "../../components/loading";

import { type CoinProps } from "../../types/coin";

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
    return <Loading frase={"Carregando detalhes da moeda..."} />;
  }

  return <CoinDetail coin={coin} />;
}
