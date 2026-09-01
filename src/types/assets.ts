export interface AssetProps {
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

export interface FormatedAssetProps extends AssetProps {
  formatedClose: string;
  formatedChange: string;
  formatedVolume: string;
  formatedMarketCap: string;
}

export interface IndexProps {
  stock: string;
  name: string;
}

export interface BrapiResponseProps {
  stocks: AssetProps[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalCount: number;
  hasNextPage: boolean;
}

export interface PaginatedAssetsProps {
  assets: FormatedAssetProps[];
  currentPage: number;
  totalPages: number;
}

export type StockTypes = "stock" | "fund";

export interface AssetSuggestion {
  stock: string;
  name: string;
  logo: string;
  type: string;
}
