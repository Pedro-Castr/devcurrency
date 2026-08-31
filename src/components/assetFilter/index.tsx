import type { StockTypes } from "../../types/assets";
import styles from "./assetFilter.module.css";

interface AssetFilterProps {
  selected: StockTypes;
  onChange: (type: StockTypes) => void;
}

export function AssetFilter({ selected, onChange }: AssetFilterProps) {
  return (
    <section className={styles.stockFilter}>
      <button
        className={
          selected === "stock" ? styles.buttonActive : styles.stockButton
        }
        onClick={() => onChange("stock")}
      >
        Ações
      </button>
      <button
        className={
          selected === "fund" ? styles.buttonActive : styles.stockButton
        }
        onClick={() => onChange("fund")}
      >
        FIIs
      </button>
    </section>
  );
}
