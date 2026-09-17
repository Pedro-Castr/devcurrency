import { AssetRow } from "../assetRow";
import { AssetFilter } from "../assetFilter";
import { AssetSort } from "../assetSort";
import type {
  FormatedAssetProps,
  StockTypes,
  SortOptions,
} from "../../../types/assets";

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
          {assets.map((asset) => (
            <AssetRow key={asset.stock} asset={asset} />
          ))}
        </tbody>
      </table>
    </>
  );
}
