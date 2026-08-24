import { useState, useEffect, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { LoadMoreButton } from "../../components/loadMoreButton";
import { SearchForm } from "../../components/searchForm";
import { AssetTable } from "../../components/assetTable";
import { Loading } from "../../components/loading";

import type { FormatedAssetProps } from "../../types/assets";
import styles from "./home.module.css";
import { getAssets } from "../../services/brapi";

export function Home() {
  const [input, setInput] = useState("");
  const [assets, setAssets] = useState<FormatedAssetProps[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadAssets() {
      try {
        const data = await getAssets("stock");
        setAssets(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

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
    return <Loading frase="Carregando..." />;
  }

  return (
    <main className={styles.container}>
      <SearchForm value={input} onChange={setInput} onSubmit={handleSubmit} />

      <AssetTable assets={assets} />

      <LoadMoreButton onClick={handleGetMore} />
    </main>
  );
}
