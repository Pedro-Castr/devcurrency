import { Link } from "react-router-dom";

import type { FormatedAssetProps } from "../../types/assets";
import styles from "./assetRow.module.css";

interface AssetRowProps {
  asset: FormatedAssetProps;
}

export function AssetRow({ asset }: AssetRowProps) {
  return (
    <tr className={styles.tr}>
      <td className={styles.tdLabel}>
        <div className={styles.name}>
          <img
            className={styles.logo}
            src={asset.logo}
            alt={`Logo da ${asset.name}`}
          />

          <Link to={`/detail/${asset.stock}`}>{asset.stock}</Link>
        </div>
      </td>

      <td className={styles.tdLabel}>{asset.formatedMarketCap}</td>

      <td className={styles.tdLabel}>{asset.formatedClose}</td>

      <td className={styles.tdLabel}>{asset.formatedVolume}</td>

      <td className={styles.tdLabel}>
        <span
          className={Number(asset.change) > 0 ? styles.tdProfit : styles.tdLoss}
        >
          {asset.formatedChange}
        </span>
      </td>
    </tr>
  );
}
