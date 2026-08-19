import { useState, useEffect, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { LoadMoreButton } from "../../components/loadMoreButton";
import { SearchForm } from "../../components/searchForm";
import { CoinTable } from "../../components/coinTable";
import { Loading } from "../../components/loading";
import { getCoins } from "../../services/coinCap";

import { type CoinFormatted } from "../../types/coin";
import styles from "./home.module.css";

export function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinFormatted[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadCoins() {
      try {
        const data = await getCoins(offset, 10);
        setCoins(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCoins();
  }, [offset]);

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
