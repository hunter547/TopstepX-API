// Main client
export { TopstepXClient } from './client';

// Auth
export { AuthService } from './auth';
export type { AuthConfig, LoginRequest, LoginResponse, ValidateResponse } from './auth';

// REST APIs
export {
  HttpClient,
  AccountApi,
  OrderApi,
  PositionApi,
  TradeApi,
  ContractApi,
  HistoryApi,
} from './rest';

export type {
  HttpClientConfig,
  // Account types
  Account,
  SearchAccountsRequest,
  SearchAccountsResponse,
  // Order types
  Order,
  PlaceOrderRequest,
  PlaceOrderResponse,
  SearchOrdersRequest,
  SearchOrdersResponse,
  SearchOpenOrdersRequest,
  CancelOrderRequest,
  CancelOrderResponse,
  ModifyOrderRequest,
  ModifyOrderResponse,
  // Position types
  Position,
  SearchOpenPositionsRequest,
  SearchOpenPositionsResponse,
  ClosePositionRequest,
  ClosePositionResponse,
  PartialClosePositionRequest,
  PartialClosePositionResponse,
  // Trade types
  Trade,
  SearchTradesRequest,
  SearchTradesResponse,
  // Contract types
  Contract,
  SearchContractsRequest,
  SearchContractsResponse,
  SearchContractByIdRequest,
  SearchContractByIdResponse,
  // History types
  Bar,
  RetrieveBarsRequest,
  RetrieveBarsResponse,
} from './rest';

// Realtime
export { ConnectionManager, MarketHub, UserHub } from './realtime';

export type {
  ConnectionManagerConfig,
  // Market hub types
  Quote,
  MarketTrade,
  MarketDepth,
  MarketEvent,
  MarketHubEvents,
  // User hub types
  OrderUpdate,
  PositionUpdate,
  TradeUpdate,
  AccountUpdate,
  UserHubEvents,
} from './realtime';

// Types & Enums
export {
  OrderType,
  OrderSide,
  OrderStatus,
  BarUnit,
  PositionType,
  TradeType,
} from './types';

export type { ApiResponse, TopstepXClientConfig, TopstepXClientEvents } from './types';

// Errors
export {
  TopstepXError,
  AuthenticationError,
  ApiError,
  ConnectionError,
} from './errors';

// Utilities
export { TypedEventEmitter } from './utils';
