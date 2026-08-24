import type {
  AssetProps,
  FormatedAssetProps,
  BrapiResponseProps,
} from "../types/assets";

import {
  formatCompactCurrency,
  formatCompactNumber,
  formatCurrency,
  formatPercent,
} from "../utils/formatCurrency";

const API_URL = "https://brapi.dev/api";
const API_KEY = import.meta.env.VITE_COINCAP_API_KEY;

export function formatAsset(asset: AssetProps): FormatedAssetProps {
  return {
    ...asset,
    formatedClose: formatCurrency(asset.close),
    formatedChange: formatPercent(asset.change),
    formatedVolume: formatCompactNumber(asset.volume),
    formatedMarketCap: formatCompactCurrency(asset.market_cap),
  };
}

async function request(endpoint: string): Promise<AssetProps[]> {
  const response = await fetch(`${API_URL}${endpoint}&token=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  const data: BrapiResponseProps = await response.json();

  return data.stocks;
}

export async function getAssets(
  type: string,
  subType?: string,
): Promise<FormatedAssetProps[]> {
  let endpoint = `/quote/list?type=${type}&limit=10`;

  if (subType) {
    endpoint += `&subType=${subType}`;
  }

  const assets = await request(endpoint);

  return assets.map(formatAsset);
}

export async function getAsset(asset: string): Promise<FormatedAssetProps> {
  const assets = await request(
    `/quote/list?type=stock&search=${encodeURIComponent(asset)}`,
  );

  return formatAsset(assets[0]);
}
