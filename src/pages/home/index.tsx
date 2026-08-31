import { useState, useEffect, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Pagination } from "../../components/pagination";
import { SearchForm } from "../../components/searchForm";
import { AssetTable } from "../../components/assetTable";
import { Loading } from "../../components/loading";

import type { StockTypes } from "../../types/assets";
import type { FormatedAssetProps } from "../../types/assets";
import styles from "./home.module.css";
import { getAssets } from "../../services/brapi";

export function Home() {
  const [input, setInput] = useState("");
  const [assets, setAssets] = useState<FormatedAssetProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stockFilter, setStockFilter] = useState<StockTypes>("stock");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAssets(page: number) {
      try {
        if (stockFilter === "fund") {
          const data = await getAssets(stockFilter, page, "fii", undefined);
          setAssets(data.assets);
          setTotalPages(data.totalPages);
        } else if (stockFilter == "stock") {
          const data = await getAssets(stockFilter, page, undefined, undefined);
          setAssets(data.assets);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Erro ao buscar ativos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAssets(currentPage);
  }, [currentPage, stockFilter]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (input === "") return;

    navigate(`/detail/${input}`);
  }

  function handleStockFilter(stockFilter: StockTypes) {
    setStockFilter(stockFilter);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main className={styles.container}>
      <SearchForm value={input} onChange={setInput} onSubmit={handleSubmit} />

      <AssetTable
        assets={assets}
        onChange={handleStockFilter}
        selected={stockFilter}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
