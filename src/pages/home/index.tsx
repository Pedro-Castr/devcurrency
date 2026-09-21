import { useState, useEffect, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Pagination } from "../../components/ui/pagination";
import { SearchForm } from "../../components/search/searchForm";
import { AssetTable } from "../../components/asset-table/assetTable";
import { Loading } from "../../components/ui/loading";

import { useLocalStorageState } from "../../hooks/useLocalStorageState";

import type {
  FormatedAssetProps,
  StockTypes,
  AssetSuggestion,
  SortOptions,
} from "../../types/assets";
import styles from "./home.module.css";
import { getAssets, searchAssetSuggestions } from "../../services/brapi";
import { useDebounce } from "../../hooks/useDebounce";

export function Home() {
  const [input, setInput] = useState("");
  const [assets, setAssets] = useState<FormatedAssetProps[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [stockFilter, setStockFilter] = useLocalStorageState<StockTypes>(
    "stockFilter",
    "stock",
  );

  const [loading, setLoading] = useState(true);

  const [suggestions, setSuggestions] = useState<AssetSuggestion[]>([]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const [sortOption, setSortOption] = useLocalStorageState<SortOptions>(
    "sortOption",
    "volume",
  );

  const [isDescending, setIsDescending] = useLocalStorageState(
    "isDescending",
    true,
  );

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
      } catch (error) {
        console.error("Erro ao buscar ativos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAssets(currentPage);
  }, [currentPage, stockFilter, sortOption, isDescending]);

  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    if (debouncedInput.length <= 2) return;

    searchAssetSuggestions(debouncedInput).then((resultados) => {
      setSuggestions(resultados);
      setDropdownIsOpen(true);
    });
  }, [debouncedInput]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (input === "") return;

    handleCloseSuggestions();
    navigate(`/detail/${input}`);
  }

  function handleSelectSuggestion(suggestion: AssetSuggestion) {
    handleCloseSuggestions();
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
