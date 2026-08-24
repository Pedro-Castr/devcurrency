import type { FormatedAssetProps } from "../../types/assets";
import styles from "./assetDetail.module.css";

interface AssetDetailProps {
  asset: FormatedAssetProps;
}

export function AssetDetail({ asset }: AssetDetailProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{asset.name}</h1>
      <h1 className={styles.center}>{asset.stock}</h1>

      <section className={styles.content}>
        <img
          className={styles.logo}
          src={asset.logo}
          alt={`Logo da ${asset.name}`}
        />

        <h1>
          {asset.name} | {asset.stock}
        </h1>

        <p>
          <strong>Preço: </strong> {asset.formatedMarketCap}
        </p>

        <p>
          <strong>Mercado: </strong> {asset.formatedClose}
        </p>

        <p>
          <strong>Volume: </strong> {asset.formatedVolume}
        </p>

        <p>
          <strong>Mudança: </strong>
          <span
            className={Number(asset.change) > 0 ? styles.profit : styles.loss}
          >
            {asset.formatedChange}
          </span>
        </p>
      </section>
    </div>
  );
}
