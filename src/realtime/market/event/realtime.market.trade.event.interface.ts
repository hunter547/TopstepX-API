export interface RealtimeMarketTradeEventInterface {
  symbolId: string;
  price: number;
  timestamp: string;
  type: 0 | 1; // Bid or Ask
  volume: number;
}
