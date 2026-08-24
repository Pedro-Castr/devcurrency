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
  type: string;
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
  indexes: IndexProps[];
  stocks: AssetProps[];
  availableSectors: string[];
  availableSubsectors: string[];
  availableStockTypes: string[];
  availableSubTypeTypes: string[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalCount: number;
  hasNextPage: boolean;
}
