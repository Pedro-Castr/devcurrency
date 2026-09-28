import type {
  TickerProps,
  FormatedTickerProps,
  BrapiResponseProps,
  PaginatedTickersProps,
  StockTypes,
  TickerSuggestion,
  SortOptions,
  sortOrderOptions,
} from "../types/ticker";

import {
  formatCompactCurrency,
  formatCompactNumber,
  formatCurrency,
  formatPercent,
} from "../utils/formatCurrency";

const API_URL = "https://brapi.dev/api";
const API_KEY = import.meta.env.VITE_BRAPI_API_KEY;

export function formatticker(ticker: TickerProps): FormatedTickerProps {
  return {
    ...ticker,
    formatedClose: formatCurrency(ticker.close),
    formatedChange: formatPercent(ticker.change),
    formatedVolume: formatCompactNumber(ticker.volume),
    formatedMarketCap: formatCompactCurrency(ticker.market_cap),
  };
}

async function request(endpoint: string): Promise<BrapiResponseProps> {
  const response = await fetch(`${API_URL}${endpoint}&token=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  return response.json();
}

export async function getTickers(
  type: string,
  page: number = 1,
  subType?: string,
  search?: string,
  sortOption?: SortOptions,
  sortOrder?: sortOrderOptions,
): Promise<PaginatedTickersProps> {
  let endpoint = `/quote/list?type=${type}&limit=10&page=${page}&sortBy=${sortOption}&sortOrder=${sortOrder}`;

  if (subType) {
    endpoint += `&subType=${subType}`;
  }

  if (search) {
    endpoint += `&search=${encodeURIComponent(search)}`;
  }

  const data = await request(endpoint);

  return {
    tickers: data.stocks.map(formatticker),
    currentPage: data.currentPage,
    totalPages: data.totalPages,
  };
}

export async function getTicker(
  ticker: string,
  type: StockTypes,
): Promise<FormatedTickerProps> {
  const data = await request(
    `/quote/list?type=${type}&search=${encodeURIComponent(ticker)}`,
  );

  if (!data.stocks || data.stocks.length === 0) {
    throw new Error("Ativo não encontrado");
  }

  return formatticker(data.stocks[0]);
}

export async function searchtickerSuggestions(
  term: string,
): Promise<TickerSuggestion[]> {
  if (!term.trim()) return [];

  const data = await request(
    `/quote/list?search=${encodeURIComponent(term)}&limit=5`,
  );

  return data.stocks.map((ticker) => ({
    stock: ticker.stock,
    name: ticker.name,
    logo: ticker.logo,
    type: ticker.type,
  }));
}
