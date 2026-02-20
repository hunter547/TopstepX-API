// Main client
export { TopstepXClient } from "./topstep.x.client";

// Auth
export { AuthService } from "./auth";
export type {
  AuthConfigInterface,
  AuthLoginRequestInterface,
  AuthLoginResponseInterface,
  AuthValidateResponseInterface,
} from "./auth";

// REST APIs
export {
  HttpClient,
  AccountApi,
  OrderApi,
  PositionApi,
  TradeApi,
  ContractApi,
  HistoryApi,
  CME_CONTRACTS,
  CmeContractStore,
} from "./rest";

export type {
  HttpClientConfigInterface,
  // Account shared
  AccountInterface,
  SearchAccountsRequestInterface,
  SearchAccountsResponseInterface,
  // Order shared
  OrderInterface,
  PlaceOrderRequestInterface,
  PlaceOrderResponseInterface,
  SearchOrdersRequestInterface,
  SearchOrdersResponseInterface,
  SearchOpenOrdersRequestInterface,
  CancelOrderRequestInterface,
  CancelOrderResponseInterface,
  ModifyOrderRequestInterface,
  ModifyOrderResponseInterface,
  // Position shared
  PositionInterface,
  SearchOpenPositionsRequestInterface,
  SearchOpenPositionsResponseInterface,
  ClosePositionRequestInterface,
  ClosePositionResponseInterface,
  PartialClosePositionRequestInterface,
  PartialClosePositionResponseInterface,
  // Trade shared
  TradeInterface,
  SearchTradesRequestInterface,
  SearchTradesResponseInterface,
  // Contract shared
  ContractInterface,
  SearchContractsRequestInterface,
  SearchContractsResponseInterface,
  SearchContractByIdRequestInterface,
  SearchContractByIdResponseInterface,
  CmeContractInterface,
  CmeContractExchangeEnum,
  CmeContractSectorEnum,
  CmeContractSectorGroupInterface,
  CmeTradeSectorGroupInterface,
  CmeContractSymbolEnum,
  // History shared
  BarInterface,
  RetrieveBarsRequestInterface,
  RetrieveBarsResponseInterface,
} from "./rest";

// Realtime
export {
  ConnectionManager,
  RealtimeMarketEventHub,
  RealtimeUserEventHub,
} from "./realtime";

export type {
  ConnectionManagerConfigInterface,
  // Market hub shared
  RealtimeMarketEventHubInterface,
  RealtimeMarketTradeEventInterface,
  RealtimeMarketDepthEventInterface,
  RealtimeMarketQuoteEventInterface,
  RealtimeMarketEventInterface,
  // User hub shared
  RealtimeUserOrderUpdateInterface,
  RealtimeUserPositionUpdateInterface,
  RealtimeUserTradeUpdateInterface,
  RealtimeUserAccountUpdateInterface,
  RealtimeUserEventHubInterface,
} from "./realtime";

// Types & Enums
export {
  OrderStatusEnum,
  PositionTypeEnum,
  TradeTypeEnum,
} from "./shared";

export type {
  ApiResponse,
  TopstepXClientConfig,
  TopstepXClientEvents,
} from "./shared";

// Errors
export {
  TopstepXError,
  AuthenticationError,
  ApiError,
  ConnectionError,
} from "./errors";

// Utilities
export { TypedEventEmitter } from "./utils";
