import { useState, useEffect, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Pagination } from "../../components/pagination";
import { SearchForm } from "../../components/searchForm";
import { AssetTable } from "../../components/assetTable";
import { Loading } from "../../components/loading";

import type {
  FormatedAssetProps,
  StockTypes,
  AssetSuggestion,
} from "../../types/assets";
import styles from "./home.module.css";
import { getAssets, searchAssetSuggestions } from "../../services/brapi";

export function Home() {
  const [input, setInput] = useState("");
  const [assets, setAssets] = useState<FormatedAssetProps[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [stockFilter, setStockFilter] = useState<StockTypes>(() => {
    const savedStockType = localStorage.getItem("stockFilter");
    return savedStockType === "stock" || savedStockType === "fund"
      ? savedStockType
      : "stock";
  });
  const [loading, setLoading] = useState(true);

  const [suggestions, setSuggestions] = useState<AssetSuggestion[]>([]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAssets(page: number) {
      try {
        if (stockFilter === "fund") {
          const data = await getAssets(stockFilter, page, "fii", undefined);
          setAssets(data.assets);
          setTotalPages(data.totalPages);
        } else if (stockFilter === "stock") {
          const data = await getAssets(stockFilter, page, undefined, undefined);
          setAssets(data.assets);
          setTotalPages(data.totalPages);
        }
        localStorage.setItem("stockFilter", stockFilter);
      } catch (error) {
        console.error("Erro ao buscar ativos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAssets(currentPage);
  }, [currentPage, stockFilter]);

  useEffect(() => {
    if (input.length <= 2) {
      return;
    }

    const timeoutId = setTimeout(async () => {
      const resultados = await searchAssetSuggestions(input);
      setSuggestions(resultados);
      setDropdownIsOpen(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [input]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (input === "") return;

    setDropdownIsOpen(false);
    navigate(`/detail/${input}`);
  }

  function handleSelectSuggestion(suggestion: AssetSuggestion) {
    setDropdownIsOpen(false);
    setInput(suggestion.stock);
    navigate(`/detail/${suggestion.stock}?type=${suggestion.type}`);
  }

  function handleCloseSuggestions() {
    setDropdownIsOpen(false);
  }

  function handleStockFilter(stockFilter: StockTypes) {
    setStockFilter(stockFilter);
    setCurrentPage(1);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main className={styles.container}>
      <SearchForm
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        suggestions={suggestions}
        isOpen={dropdownIsOpen}
        onSelectSuggestion={handleSelectSuggestion}
        onCloseSuggestions={handleCloseSuggestions}
      />

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
