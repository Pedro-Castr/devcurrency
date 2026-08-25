import { useState, useEffect, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Pagination } from "../../components/pagination";
import { SearchForm } from "../../components/searchForm";
import { AssetTable } from "../../components/assetTable";
import { Loading } from "../../components/loading";

import type { FormatedAssetProps } from "../../types/assets";
import styles from "./home.module.css";
import { getAssets } from "../../services/brapi";

export function Home() {
  const [input, setInput] = useState("");
  const [assets, setAssets] = useState<FormatedAssetProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAssets(page: number) {
      try {
        const data = await getAssets("stock", page, undefined, undefined);

        setAssets(data.assets);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Erro ao buscar ativos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAssets(currentPage);
  }, [currentPage]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (input === "") return;

    navigate(`/detail/${input}`);
  }

  if (loading) {
    return <Loading frase="Carregando..." />;
  }

  return (
    <main className={styles.container}>
      <SearchForm value={input} onChange={setInput} onSubmit={handleSubmit} />

      <AssetTable assets={assets} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
