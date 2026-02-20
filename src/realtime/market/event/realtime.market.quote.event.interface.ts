export interface RealtimeMarketQuoteEventInterface {
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
