import type { CoinProps, CoinFormatted, CoinCapResponse } from "../types/coin";

import { price, priceCompact } from "../utils/formatCurrency";

const API_URL = "https://rest.coincap.io/v3";
const API_KEY = import.meta.env.VITE_COINCAP_API_KEY;

function formatCoin(coin: CoinProps): CoinFormatted {
  return {
    ...coin,
    formattedPrice: price.format(Number(coin.priceUsd)),
    formattedMarket: priceCompact.format(Number(coin.marketCapUsd)),
    formattedVolume: priceCompact.format(Number(coin.volumeUsd24Hr)),
  };
}

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}&apiKey=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  const data: CoinCapResponse<T> = await response.json();

  return data.data;
}

export async function getCoins(
  offset = 0,
  limit = 10,
): Promise<CoinFormatted[]> {
  const coins = await request<CoinProps[]>(
    `/assets?limit=${limit}&offset=${offset}`,
  );

  return coins.map(formatCoin);
}

export async function getCoin(id: string): Promise<CoinFormatted> {
  const coin = await request<CoinProps>(`/assets/${encodeURIComponent(id)}?`);

  return formatCoin(coin);
}
