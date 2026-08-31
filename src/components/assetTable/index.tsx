import { AssetRow } from "../assetRow";
import { AssetFilter } from "../assetFilter";
import type { FormatedAssetProps, StockTypes } from "../../types/assets";

import styles from "./assetTable.module.css";

interface AssetTableProps {
  assets: FormatedAssetProps[];
  selected: StockTypes;
  onChange: (type: StockTypes) => void;
}

export function AssetTable({ assets, onChange, selected }: AssetTableProps) {
  return (
    <>
      <AssetFilter onChange={onChange} selected={selected} />

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
