import type { StockTypes } from "../../../types/ticker";
import styles from "./tickerFilter.module.css";

interface TickerFilterProps {
  selected: StockTypes;
  onChange: (type: StockTypes) => void;
}

export function TickerFilter({ selected, onChange }: TickerFilterProps) {
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
