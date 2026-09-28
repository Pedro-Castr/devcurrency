import type { SortOptions } from "../../../types/ticker";

import { BsChevronDown } from "react-icons/bs";
import styles from "./tickerSort.module.css";

interface TickerSortProps {
  sortOption: SortOptions;
  handleOption: (sortOption: SortOptions) => void;
}

export function TickerSort({ sortOption, handleOption }: TickerSortProps) {
  const sortOptions: SortOptions[] = [
    "change",
    "close",
    "market_cap_basic",
    "name",
    "volume",
  ];

  const sortOptionLabels: Record<SortOptions, string> = {
    change: "Variação",
    close: "Preço",
    market_cap_basic: "Valor de Mercado",
    name: "Nome",
    volume: "Volume",
  };

  return (
    <section className={styles.wrapper}>
      <select
        className={styles.select}
        value={sortOption}
        onChange={(event) => handleOption(event.target.value as SortOptions)}
      >
        {sortOptions.map((opt) => (
          <option key={opt} value={opt}>
            {sortOptionLabels[opt]}
          </option>
        ))}
      </select>

      <BsChevronDown className={styles.icon} size={12} />
    </section>
  );
}
