import { AssetRow } from "../assetRow";
import { AssetFilter } from "../assetFilter";
import { AssetSort } from "../assetSort";
import type {
  FormatedAssetProps,
  StockTypes,
  SortOptions,
} from "../../types/assets";

import styles from "./assetTable.module.css";
import { SortOrderButton } from "../sortOrderButton";

interface AssetTableProps {
  assets: FormatedAssetProps[];
  selected: StockTypes;
  sortOption: SortOptions;
  isDescending: true | false;
  onChangeFilter: (type: StockTypes) => void;
  handleOption: (sortOption: SortOptions) => void;
  onToggle: () => void;
}

export function AssetTable({
  assets,
  selected,
  sortOption,
  isDescending,
  onChangeFilter,
  handleOption,
  onToggle,
}: AssetTableProps) {
  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.sortGroup}>
          <AssetSort sortOption={sortOption} handleOption={handleOption} />

          <SortOrderButton onToggle={onToggle} isDescending={isDescending} />
        </div>

        <AssetFilter onChange={onChangeFilter} selected={selected} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            {selected === "stock" && <th>Valor de Mercado</th>}
            <th>Volume</th>
            <th>Variação</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset) => (
            <AssetRow key={asset.stock} asset={asset} />
          ))}
        </tbody>
      </table>
    </>
  );
}
