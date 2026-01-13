export interface Quote {
  symbol: string;
  lastPrice: number;
  bestBid: number;
  bestAsk: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdated: string;
  timestamp: string;
}

export interface MarketTrade {
  symbolId: string;
  price: number;
  timestamp: string;
  type: 0 | 1; // Bid or Ask
  volume: number;
}

export interface MarketDepth {
  price: number;
  volume: number;
  currentVolume: number;
  type: number;
  timestamp: string;
}

export interface MarketEvent<T> {
  contractId: string;
  data: T[];
}

export interface MarketHubEvents {
  [key: string]: unknown;
  quote: MarketEvent<Quote>;
  trade: MarketEvent<MarketTrade>;
  depth: MarketEvent<MarketDepth>;
}
