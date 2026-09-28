import { TickerRow } from "../tickerRow";
import { TickerFilter } from "../tickerFilter";
import { TickerSort } from "../tickerSort";
import type {
  FormatedTickerProps,
  StockTypes,
  SortOptions,
} from "../../../types/ticker";

import styles from "./tickerTable.module.css";
import { SortOrderButton } from "../sortOrderButton";

interface TickerTableProps {
  tickers: FormatedTickerProps[];
  selected: StockTypes;
  sortOption: SortOptions;
  isDescending: true | false;
  onChangeFilter: (type: StockTypes) => void;
  handleOption: (sortOption: SortOptions) => void;
  onToggle: () => void;
}

export function TickerTable({
  tickers,
  selected,
  sortOption,
  isDescending,
  onChangeFilter,
  handleOption,
  onToggle,
}: TickerTableProps) {
  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.sortGroup}>
          <TickerSort sortOption={sortOption} handleOption={handleOption} />

          <SortOrderButton onToggle={onToggle} isDescending={isDescending} />
        </div>

        <TickerFilter onChange={onChangeFilter} selected={selected} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th data-tooltip="Nome da empresa ou fundo e código de negociação (ticker)">
              Nome
            </th>
            <th data-tooltip="Último preço de fechamento negociado">Preço</th>
            {selected === "stock" && (
              <th data-tooltip="Valor total da empresa">Valor de Mercado</th>
            )}
            <th data-tooltip="Quantidade financeira negociada no dia">
              Volume
            </th>
            <th data-tooltip="Variação percentual do preço em relação ao fechamento anterior">
              Variação
            </th>
          </tr>
        </thead>

        <tbody>
          {tickers.map((ticker) => (
            <TickerRow key={ticker.stock} ticker={ticker} />
          ))}
        </tbody>
      </table>
    </>
  );
}
