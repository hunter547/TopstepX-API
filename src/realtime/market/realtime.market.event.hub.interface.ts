import {
  RealtimeMarketDepthEventInterface,
  RealtimeMarketTradeEventInterface,
  RealtimeMarketQuoteEventInterface,
  RealtimeMarketEventInterface,
} from "./event";

export interface RealtimeMarketEventHubInterface {
  [key: string]: unknown;
  quote: RealtimeMarketEventInterface<RealtimeMarketQuoteEventInterface>;
  trade: RealtimeMarketEventInterface<RealtimeMarketTradeEventInterface>;
  depth: RealtimeMarketEventInterface<RealtimeMarketDepthEventInterface>;
}
