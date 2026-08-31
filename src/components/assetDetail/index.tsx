import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import type { FormatedAssetProps } from "../../types/assets";
import styles from "./assetDetail.module.css";

interface AssetDetailProps {
  asset: FormatedAssetProps;
}

export function AssetDetail({ asset }: AssetDetailProps) {
  const isProfit = Number(asset.change) > 0;
  const assetTypeLabel = asset.type === "fund" ? "FII" : "Ação";

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.back}>
        <BsArrowLeft size={16} />
        Voltar
      </Link>

      <section className={styles.hero}>
        <img
          className={styles.logo}
          src={asset.logo}
          alt={`Logo da ${asset.name}`}
        />

        <div className={styles.heroInfo}>
          <span className={styles.badge}>{assetTypeLabel}</span>
          <h1 className={styles.name}>{asset.name}</h1>
          <span className={styles.stock}>{asset.stock}</span>
        </div>
      </section>

      <section className={styles.priceSection}>
        <div>
          <span className={styles.priceLabel}>Preço</span>
          <strong className={styles.price}>{asset.formatedClose}</strong>
        </div>

        <span className={isProfit ? styles.profit : styles.loss}>
          {asset.formatedChange}
        </span>
      </section>

      <section className={styles.statsGrid}>
        {asset.type === "stock" && (
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Valor de mercado</span>
            <strong className={styles.statValue}>
              {asset.formatedMarketCap}
            </strong>
          </div>
        )}
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Volume</span>
          <strong className={styles.statValue}>{asset.formatedVolume}</strong>
        </div>
      </section>

      <section className={styles.classification}>
        {asset.sector && <span className={styles.tag}>{asset.sector}</span>}
        {asset.subsector && (
          <span className={styles.tag}>{asset.subsector}</span>
        )}
      </section>
    </div>
  );
}
