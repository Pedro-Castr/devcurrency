export interface TickerListItemProps {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap: number;
  logo: string;
  sector: string;
  subsector: string;
  type: StockTypes;
  subType: string;
}

export interface FormatedTickerListItemProps extends TickerListItemProps {
  formatedClose: string;
  formatedChange: string;
  formatedVolume: string;
  formatedMarketCap: string;
}

export interface TickerQuoteProps {
  symbol: string;
  shortName: string;
  longName: string;
  currency: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketDayRange: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: Date;
  marketCap: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  priceEarnings: number;
  earningsPerShare: number;
  logourl: string;
}

export interface FormatedTickerQuoteProps extends TickerQuoteProps {
  formatedRegularMarketPrice: string;
  formatedRegularMarketDayHigh: string;
  formatedRegularMarketDayLow: string;
  formatedRegularMarketChangePercent: string;
  formatedMarketCap: string;
  formatedFiftyTwoWeekLow: string;
  formatedFiftyTwoWeekHigh: string;
  formatedPriceEarnings: string;
  formatedRegularMarketOpen: string;
  formatedRegularMarketPreviousClose: string;
  formatedRegularMarketVolume: string;
  formatedEarningsPerShare: string;
}

export interface IndexProps {
  stock: string;
  name: string;
}

export interface BrapiResponseListItemProps {
  stocks: TickerListItemProps[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalCount: number;
  hasNextPage: boolean;
}

export interface BrapiResponseQuoteProps {
  results: TickerQuoteProps[];
}

export interface PaginatedTickersProps {
  tickers: FormatedTickerListItemProps[];
  currentPage: number;
  totalPages: number;
}

export type StockTypes = "stock" | "fund";

export type SortOptions =
  "name" | "close" | "change" | "volume" | "market_cap_basic";

export type sortOrderOptions = "asc" | "desc";

export interface TickerSuggestion {
  stock: string;
  name: string;
  logo: string;
  type: string;
}
