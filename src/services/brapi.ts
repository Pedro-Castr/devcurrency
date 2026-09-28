import type {
  TickerListItemProps,
  TickerQuoteProps,
  FormatedTickerListItemProps,
  FormatedTickerQuoteProps,
  BrapiResponseListItemProps,
  BrapiResponseQuoteProps,
  PaginatedTickersProps,
  TickerSuggestion,
  SortOptions,
  sortOrderOptions,
} from "../types/ticker";

import {
  formatCompactCurrency,
  formatCompactNumber,
  formatCurrency,
  formatNumber,
  formatPercent,
} from "../utils/formatCurrency";

const API_URL = "https://brapi.dev/api";
const API_KEY = import.meta.env.VITE_BRAPI_API_KEY;

export function formatTickerItem(
  ticker: TickerListItemProps,
): FormatedTickerListItemProps {
  return {
    ...ticker,
    formatedClose: formatCurrency(ticker.close),
    formatedChange: formatPercent(ticker.change),
    formatedVolume: formatCompactNumber(ticker.volume),
    formatedMarketCap: formatCompactCurrency(ticker.market_cap),
  };
}

export function formatTickerQuote(
  ticker: TickerQuoteProps,
): FormatedTickerQuoteProps {
  return {
    ...ticker,
    formatedRegularMarketPrice: formatCurrency(ticker.regularMarketPrice),
    formatedRegularMarketDayHigh: formatCurrency(ticker.regularMarketDayHigh),
    formatedRegularMarketDayLow: formatCurrency(ticker.regularMarketDayLow),
    formatedRegularMarketChangePercent: formatPercent(
      ticker.regularMarketChangePercent,
    ),
    formatedMarketCap: formatCompactCurrency(ticker.marketCap),
    formatedFiftyTwoWeekLow: formatCurrency(ticker.fiftyTwoWeekLow),
    formatedFiftyTwoWeekHigh: formatCurrency(ticker.fiftyTwoWeekHigh),
    formatedPriceEarnings: formatNumber(ticker.priceEarnings),
    formatedRegularMarketOpen: formatCurrency(ticker.regularMarketOpen),
    formatedRegularMarketPreviousClose: formatCurrency(
      ticker.regularMarketPreviousClose,
    ),
    formatedRegularMarketVolume: formatCompactCurrency(
      ticker.regularMarketVolume,
    ),
    formatedEarningsPerShare: formatCurrency(ticker.earningsPerShare),
  };
}

async function requestItem(
  endpoint: string,
): Promise<BrapiResponseListItemProps> {
  const response = await fetch(`${API_URL}${endpoint}&token=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  return response.json();
}
async function requestQuote(
  endpoint: string,
): Promise<BrapiResponseQuoteProps> {
  const response = await fetch(`${API_URL}${endpoint}?token=${API_KEY}`);

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

  const data = await requestItem(endpoint);

  return {
    tickers: data.stocks.map(formatTickerItem),
    currentPage: data.currentPage,
    totalPages: data.totalPages,
  };
}

export async function getTicker(
  symbol: string,
): Promise<FormatedTickerQuoteProps> {
  const data = await requestQuote(`/quote/${encodeURIComponent(symbol)}`);

  if (!data.results) {
    throw new Error("Ativo não encontrado");
  }

  return formatTickerQuote(data.results[0]);
}

export async function searchtickerSuggestions(
  term: string,
): Promise<TickerSuggestion[]> {
  if (!term.trim()) return [];

  const data = await requestItem(
    `/quote/list?search=${encodeURIComponent(term)}&limit=5`,
  );

  return data.stocks.map((ticker) => ({
    stock: ticker.stock,
    name: ticker.name,
    logo: ticker.logo,
    type: ticker.type,
  }));
}
