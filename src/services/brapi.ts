import type {
  AssetProps,
  FormatedAssetProps,
  BrapiResponseProps,
  PaginatedAssetsProps,
  StockTypes,
  AssetSuggestion,
} from "../types/assets";

import {
  formatCompactCurrency,
  formatCompactNumber,
  formatCurrency,
  formatPercent,
} from "../utils/formatCurrency";

const API_URL = "https://brapi.dev/api";
const API_KEY = import.meta.env.VITE_BRAPI_API_KEY;

export function formatAsset(asset: AssetProps): FormatedAssetProps {
  return {
    ...asset,
    formatedClose: formatCurrency(asset.close),
    formatedChange: formatPercent(asset.change),
    formatedVolume: formatCompactNumber(asset.volume),
    formatedMarketCap: formatCompactCurrency(asset.market_cap),
  };
}

async function request(endpoint: string): Promise<BrapiResponseProps> {
  const response = await fetch(`${API_URL}${endpoint}&token=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  return response.json();
}

export async function getAssets(
  type: string,
  page: number = 1,
  subType?: string,
  search?: string,
): Promise<PaginatedAssetsProps> {
  let endpoint = `/quote/list?type=${type}&limit=10&page=${page}`;

  if (subType) {
    endpoint += `&subType=${subType}`;
  }

  if (search) {
    endpoint += `&search=${encodeURIComponent(search)}`;
  }

  const data = await request(endpoint);

  return {
    assets: data.stocks.map(formatAsset),
    currentPage: data.currentPage,
    totalPages: data.totalPages,
  };
}

export async function getAsset(
  asset: string,
  type: StockTypes,
): Promise<FormatedAssetProps> {
  const data = await request(
    `/quote/list?type=${type}&search=${encodeURIComponent(asset)}`,
  );

  return formatAsset(data.stocks[0]);
}

export async function searchAssetSuggestions(
  term: string,
): Promise<AssetSuggestion[]> {
  if (!term.trim()) return [];

  const data = await request(
    `/quote/list?search=${encodeURIComponent(term)}&limit=5`,
  );

  return data.stocks.map((asset) => ({
    stock: asset.stock,
    name: asset.name,
    logo: asset.logo,
    type: asset.type,
  }));
}
