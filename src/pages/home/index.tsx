import { useState, useEffect, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { LoadMoreButton } from "../../components/loadMoreButton";
import { SearchForm } from "../../components/searchForm";
import { CoinTable } from "../../components/coinTable";
import Loading from "../../components/loading";

import { price, priceCompact } from "../../utils/formatCurrency";
import { type CoinProps } from "../../types/coin";
import styles from "./home.module.css";

interface DataProps {
  data: CoinProps[];
}

export function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    getData();
  }, [offset]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getData() {
    fetch(
      `https://rest.coincap.io/v3/assets?limit=10&offset=${offset}&apiKey=f6c7b530fa30adb164ab88c5b2d47b5e38573d084dfd3ed64cd5e436ab4de470`,
    )
      .then((response) => response.json())
      .then((data: DataProps) => {
        const coinsData = data.data;

        const formatedResults = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
            formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
          };

          return formated;
        });

        const listCoins = [...coins, ...formatedResults];
        setCoins(listCoins);
      });

    setLoading(false);
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (input === "") return;

    navigate(`/detail/${input}`);
  }

  function handleGetMore() {
    if (offset === 0) {
      setOffset(10);
      return;
    }

    setOffset(offset + 10);
  }

  if (loading) {
    return <Loading frase="Carregando moedas..." />;
  }

  return (
    <main className={styles.container}>
      <SearchForm value={input} onChange={setInput} onSubmit={handleSubmit} />

      <CoinTable coins={coins} />

      <LoadMoreButton onClick={handleGetMore} />
    </main>
  );
}
