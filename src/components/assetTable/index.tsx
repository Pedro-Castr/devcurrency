import { AssetRow } from "../assetRow";
import type { FormatedAssetProps } from "../../types/assets";

import styles from "./assetTable.module.css";

interface AssetTableProps {
  assets: FormatedAssetProps[];
}

export function AssetTable({ assets }: AssetTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Moeda</th>
          <th>Valor mercado</th>
          <th>Preço</th>
          <th>Volume</th>
          <th>Mudança 24h</th>
        </tr>
      </thead>

      <tbody>
        {assets.map((asset) => (
          <AssetRow key={asset.stock} asset={asset} />
        ))}
      </tbody>
    </table>
  );
}
