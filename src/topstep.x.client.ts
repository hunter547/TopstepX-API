import { AuthService } from "./auth";
import {
  HttpClient,
  AccountApi,
  OrderApi,
  PositionApi,
  TradeApi,
  ContractApi,
  HistoryApi,
} from "./rest";
import {
  ConnectionManager,
  RealtimeMarketEventHub,
  RealtimeUserEventHub,
} from "./realtime";
import { TypedEventEmitter } from "./utils";
import type { TopstepXClientConfig, TopstepXClientEvents } from "./shared";

/**
 * Main client for interacting with the TopstepX trading API.
 *
 * Provides access to REST APIs for account management, order placement,
 * position management, trade history, contract search, and historical data.
 * Also provides real-time WebSocket connections for market data and account updates.
 *
 * @example
 * ```typescript
 * import { TopstepXClient, OrderType, OrderSide } from 'topstepx-api';
 *
 * const client = new TopstepXClient({
 *   username: process.env.TOPSTEP_USERNAME,
 *   apiKey: process.env.TOPSTEP_API_KEY,
 * });
 *
 * await client.connect();
 *
 * // Get accounts
 * const accounts = await client.accounts.search({ onlyActiveAccounts: true });
 *
 * // Place an order
 * await client.orders.place({
 *   accountId: accounts[0].id,
 *   contractId: 'CON.F.US.ENQ.M25',
 *   type: OrderType.Market,
 *   side: OrderSide.Buy,
 *   size: 1,
 * });
 *
 * // Subscribe to real-time quotes
 * client.marketHub.on('quote', ({ contractId, data }) => {
 *   console.log('Quote:', data);
 * });
 * await client.marketHub.subscribe('CON.F.US.ENQ.M25');
 *
 * await client.disconnect();
 * ```
 *
 * @category Client
 */
export class TopstepXClient extends TypedEventEmitter<TopstepXClientEvents> {
  private readonly auth: AuthService;
  private readonly connectionManager: ConnectionManager;
  private readonly httpClient: HttpClient;

  /** Account management API */
  public readonly accounts: AccountApi;
  /** Order management API (place, cancel, modify, search) */
  public readonly orders: OrderApi;
  /** Position management API (search, close) */
  public readonly positions: PositionApi;
  /** Trade history API */
  public readonly trades: TradeApi;
  /** Contract/symbol search API */
  public readonly contracts: ContractApi;
  /** Historical bars/candles API */
  public readonly history: HistoryApi;

  /** Real-time market data hub (quotes, trades, depth) */
  public readonly marketHub: RealtimeMarketEventHub;
  /** Real-time account data hub (orders, positions, trades) */
  public readonly userHub: RealtimeUserEventHub;

  constructor(config: TopstepXClientConfig) {
    super();

    const baseUrl = config.baseUrl ?? "https://api.topstepx.com";

    this.auth = new AuthService({
      username: config.username,
      apiKey: config.apiKey,
      baseUrl,
      autoRefresh: config.autoRefresh ?? true,
      tokenValidityHours: config.tokenValidityHours ?? 24,
    });

    this.httpClient = new HttpClient({
      baseUrl,
      getToken: () => this.auth.getSessionToken(),
    });

    // Initialize REST APIs
    this.accounts = new AccountApi(this.httpClient);
    this.orders = new OrderApi(this.httpClient);
    this.positions = new PositionApi(this.httpClient);
    this.trades = new TradeApi(this.httpClient);
    this.contracts = new ContractApi(this.httpClient);
    this.history = new HistoryApi(this.httpClient);

    // Initialize Realtime
    this.connectionManager = new ConnectionManager({
      marketHubUrl:
        config.marketHubUrl ?? "https://rtc.topstepx.com/hubs/market",
      userHubUrl: config.userHubUrl ?? "https://rtc.topstepx.com/hubs/user",
      auth: this.auth,
    });

    this.marketHub = new RealtimeMarketEventHub(this.connectionManager);
    this.userHub = new RealtimeUserEventHub(this.connectionManager);
  }

  /**
   * Connect to the TopstepX API.
   * Authenticates and establishes WebSocket connections.
   */
  async connect(): Promise<void> {
    await this.auth.login();
    await this.connectionManager.connect();
    this.emit("connected");
  }

  /**
   * Disconnect from all services.
   */
  async disconnect(): Promise<void> {
    await this.connectionManager.disconnect();
    this.auth.destroy();
    this.emit("disconnected");
  }

  /**
   * Check if client is connected.
   */
  get isConnected(): boolean {
    return this.connectionManager.isConnected;
  }

  /**
   * Get the current auth token (for advanced use cases).
   */
  async getToken(): Promise<string> {
    return this.auth.getSessionToken();
  }
}
