import { useState, useEffect, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Pagination } from "../../components/ui/pagination";
import { SearchForm } from "../../components/search/searchForm";
import { AssetTable } from "../../components/asset-table/assetTable";
import { Loading } from "../../components/ui/loading";

import type {
  FormatedAssetProps,
  StockTypes,
  AssetSuggestion,
  SortOptions,
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

  const sortOptions: SortOptions[] = [
    "change",
    "close",
    "market_cap_basic",
    "name",
    "volume",
  ];

  function isSortOption(value: string | null): value is SortOptions {
    return sortOptions.includes(value as SortOptions);
  }

  const [sortOption, setSortOption] = useState<SortOptions>(() => {
    const savedSort = localStorage.getItem("sortOption");
    return isSortOption(savedSort) ? savedSort : "volume";
  });

  const [isDescending, setIsDescending] = useState(() => {
    const savedIsDescending = localStorage.getItem("isDescending");
    return savedIsDescending === "true" || savedIsDescending === "false"
      ? savedIsDescending === "true"
      : true;
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAssets(page: number) {
      try {
        const subType = stockFilter === "fund" ? "fii" : undefined;
        const sortOrder = isDescending === true ? "desc" : "asc";

        const data = await getAssets(
          stockFilter,
          page,
          subType,
          undefined,
          sortOption,
          sortOrder,
        );
        setAssets(data.assets);
        setTotalPages(data.totalPages);

        localStorage.setItem("stockFilter", stockFilter);
        localStorage.setItem("sortOption", sortOption);
        localStorage.setItem("isDescending", JSON.stringify(isDescending));
      } catch (error) {
        console.error("Erro ao buscar ativos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAssets(currentPage);
  }, [currentPage, stockFilter, sortOption, isDescending]);

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

  function handleOption(sortOption: SortOptions) {
    setSortOption(sortOption);
    setCurrentPage(1);
  }

  function handleToggleOrder() {
    setIsDescending((current) => !current);
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
        selected={stockFilter}
        sortOption={sortOption}
        onChangeFilter={handleStockFilter}
        handleOption={handleOption}
        isDescending={isDescending}
        onToggle={handleToggleOrder}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
