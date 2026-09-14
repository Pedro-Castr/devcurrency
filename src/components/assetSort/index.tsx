import type { SortOptions } from "../../types/assets";

import { BsChevronDown } from "react-icons/bs";
import styles from "./assetSort.module.css";

interface AssetSortProps {
  sortOption: SortOptions;
  handleOption: (sortOption: SortOptions) => void;
}

export function AssetSort({ sortOption, handleOption }: AssetSortProps) {
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
