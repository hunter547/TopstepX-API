# topstepx-api [![NPM Version](https://badge.fury.io/js/topstepx-api.svg?style=flat)](https://www.npmjs.com/package/topstepx-api)

A framework-agnostic TypeScript client for the TopstepX trading API with REST and SignalR data feeds via WebSocket.

## Features

- Full REST API coverage (accounts, orders, positions, trades, contracts, history)
- Real-time WebSocket data via SignalR (quotes, trades, market depth)
- Automatic token management and refresh
- TypeScript-first with complete type definitions
- Works with any Node.js framework (Express, Fastify, NestJS, etc.)
- Dual ESM/CommonJS support

## Installation

```bash
npm install topstepx-api
```

## Environment Setup

Create a `.env` file in your project root:

```env
TOPSTEP_USERNAME=your_username
TOPSTEP_API_KEY=your_api_key
```

Get your API key from your TopstepX account settings.

## Quick Start

```typescript
import { TopstepXClient, OrderType, OrderSide } from 'topstepx-api';

const client = new TopstepXClient({
  username: process.env.TOPSTEP_USERNAME!,
  apiKey: process.env.TOPSTEP_API_KEY!,
});

await client.connect();

// Get accounts
const response = await client.accounts.search({ onlyActiveAccounts: true });
console.log('Accounts:', response.accounts);

// Place a market order
const order = await client.orders.place({
  accountId: response.accounts[0].id,
  contractId: 'CON.F.US.ENQ.M25',
  type: OrderType.Market,
  side: OrderSide.Buy,
  size: 1,
});
console.log('Order placed:', order.orderId);

// Disconnect when done
await client.disconnect();
```

## API Reference

### TopstepXClient

The main client class that provides access to all APIs.

#### Constructor

```typescript
const client = new TopstepXClient({
  username: string;          // Required: TopstepX username
  apiKey: string;            // Required: TopstepX API key
  baseUrl?: string;          // Optional: API base URL (default: https://api.topstepx.com)
  marketHubUrl?: string;     // Optional: Market WebSocket URL
  userHubUrl?: string;       // Optional: User WebSocket URL
  autoRefresh?: boolean;     // Optional: Auto-refresh tokens (default: true)
  tokenValidityHours?: number; // Optional: Token validity period (default: 24)
});
```

#### Methods

| Method | Description |
|--------|-------------|
| `connect()` | Authenticate and establish WebSocket connections |
| `disconnect()` | Close all connections and cleanup |
| `getToken()` | Get the current session token |
| `isConnected` | Check if WebSocket connections are active |

#### Events

```typescript
client.on('connected', () => console.log('Connected'));
client.on('disconnected', () => console.log('Disconnected'));
client.on('error', (error) => console.error('Error:', error));
```

---

### Accounts API

Access via `client.accounts`

#### search

Search for accounts.

```typescript
const response = await client.accounts.search({
  onlyActiveAccounts: boolean;
});

// Returns: SearchAccountsResponse
interface SearchAccountsResponse {
  accounts: Account[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

interface Account {
  id: number;
  name: string;
  canTrade: boolean;
  isVisible: boolean;
}
```

---

### Orders API

Access via `client.orders`

#### place

Place a new order.

```typescript
import { OrderType, OrderSide } from 'topstepx-api';

const result = await client.orders.place({
  accountId: number;
  contractId: string;
  type: OrderType;           // Market, Limit, Stop, StopLimit
  side: OrderSide;           // Buy, Sell
  size: number;
  limitPrice?: number;       // Required for Limit/StopLimit
  stopPrice?: number;        // Required for Stop/StopLimit
  trailPrice?: number;       // Optional trailing stop price
  customTag?: string;        // Optional custom identifier
  linkedOrderId?: number;    // Optional linked order (OCO)
});

// Returns: PlaceOrderResponse
interface PlaceOrderResponse {
  orderId: number;
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
```

#### cancel

Cancel an existing order.

```typescript
const response = await client.orders.cancel({
  accountId: number;
  orderId: number;
});

// Returns: CancelOrderResponse
interface CancelOrderResponse {
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
```

#### modify

Modify an existing order.

```typescript
const response = await client.orders.modify({
  accountId: number;
  orderId: number;
  size?: number;
  limitPrice?: number;
  stopPrice?: number;
  trailPrice?: number;
});

// Returns: ModifyOrderResponse
interface ModifyOrderResponse {
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
```

#### search

Search historical orders.

```typescript
const response = await client.orders.search({
  accountId: number;
  startTimestamp?: string;   // ISO 8601 format
  endTimestamp?: string;
});

// Returns: SearchOrdersResponse
interface SearchOrdersResponse {
  orders: Order[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

interface Order {
  id: number;
  accountId: number;
  contractId: string;
  creationTimestamp: string;
  updateTimestamp: string | null;
  status: OrderStatus;
  type: OrderType;
  side: OrderSide;
  size: number;
  limitPrice: number | null;
  stopPrice: number | null;
}
```

#### searchOpen

Get currently open orders.

```typescript
const response = await client.orders.searchOpen({
  accountId: number;
});

// Returns: SearchOpenOrdersResponse
interface SearchOpenOrdersResponse {
  orders: Order[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
```

---

### Positions API

Access via `client.positions`

#### searchOpen

Get open positions.

```typescript
const response = await client.positions.searchOpen({
  accountId: number;
});

// Returns: SearchOpenPositionsResponse
interface SearchOpenPositionsResponse {
  positions: Position[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

interface Position {
  id: number;
  accountId: number;
  contractId: string;
  creationTimestamp: string;
  type: PositionType;        // Long, Short
  size: number;
  averagePrice: number;
}
```

#### close

Close a position entirely.

```typescript
const response = await client.positions.close({
  accountId: number;
  contractId: string;
});

// Returns: ClosePositionResponse
interface ClosePositionResponse {
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
```

#### partialClose

Partially close a position.

```typescript
const response = await client.positions.partialClose({
  accountId: number;
  contractId: string;
  size: number;              // Number of contracts to close
});

// Returns: PartialClosePositionResponse
interface PartialClosePositionResponse {
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
```

---

### Trades API

Access via `client.trades`

#### search

Search trade history.

```typescript
const response = await client.trades.search({
  accountId: number;
  startTimestamp: string;    // ISO 8601 format
  endTimestamp: string;
});

// Returns: SearchTradesResponse
interface SearchTradesResponse {
  trades: Trade[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

interface Trade {
  id: number;
  accountId: number;
  contractId: string;
  creationTimestamp: string;
  price: number;
  profitAndLoss: number | null;
  fees: number;
  side: OrderSide;
  size: number;
  voided: boolean;
  orderId: number;
}
```

---

### Contracts API

Access via `client.contracts`

#### search

Search for contracts/symbols.

```typescript
const response = await client.contracts.search({
  searchText: string;        // e.g., "ES", "NQ", "CL"
  live: boolean;             // true for live, false for sim
});

// Returns: SearchContractsResponse
interface SearchContractsResponse {
  contracts: Contract[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

interface Contract {
  id: string;
  name: string;
  description: string;
  tickSize: number;
  tickValue: number;
  activeContract: boolean;
}
```

#### searchById

Get a specific contract by ID.

```typescript
const response = await client.contracts.searchById({
  contractId: string;        // e.g., "CON.F.US.ENQ.M25"
  live: boolean;
});

// Returns: SearchContractByIdResponse
interface SearchContractByIdResponse {
  contract: Contract | null;
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
```

---

### History API

Access via `client.history`

#### retrieveBars

Get historical OHLCV bars.

```typescript
import { BarUnit } from 'topstepx-api';

const response = await client.history.retrieveBars({
  contractId: string;
  live: boolean;
  startTime: string;         // ISO 8601 format
  endTime: string;
  unit: BarUnit;             // Second, Minute, Hour, Day, Week, Month
  unitNumber: number;        // e.g., 5 for 5-minute bars
  limit: number;             // Max bars to return
  includePartialBar: boolean;
});

// Returns: RetrieveBarsResponse
interface RetrieveBarsResponse {
  bars: Bar[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

interface Bar {
  t: string;   // timestamp
  o: number;   // open
  h: number;   // high
  l: number;   // low
  c: number;   // close
  v: number;   // volume
}
```

---

### Market Hub (Real-time Market Data)

Access via `client.marketHub`

Subscribe to real-time market data via WebSocket.

#### Subscribing

```typescript
// Subscribe to all market data for a contract
await client.marketHub.subscribe('CON.F.US.ENQ.M25');

// Or subscribe selectively
await client.marketHub.subscribeQuotes('CON.F.US.ENQ.M25');
await client.marketHub.subscribeTrades('CON.F.US.ENQ.M25');
await client.marketHub.subscribeDepth('CON.F.US.ENQ.M25');
```

#### Unsubscribing

```typescript
await client.marketHub.unsubscribe('CON.F.US.ENQ.M25');

// Or unsubscribe selectively
await client.marketHub.unsubscribeQuotes('CON.F.US.ENQ.M25');
await client.marketHub.unsubscribeTrades('CON.F.US.ENQ.M25');
await client.marketHub.unsubscribeDepth('CON.F.US.ENQ.M25');
```

#### Events

```typescript
// Quote updates
client.marketHub.on('quote', ({ contractId, data }) => {
  for (const quote of data) {
    console.log(`${contractId}: Bid ${quote.bestBid} / Ask ${quote.bestAsk}`);
  }
});

// Trade updates
client.marketHub.on('trade', ({ contractId, data }) => {
  for (const trade of data) {
    console.log(`${contractId}: ${trade.volume} @ ${trade.price}`);
  }
});

// Market depth updates
client.marketHub.on('depth', ({ contractId, data }) => {
  for (const level of data) {
    console.log(`${contractId}: ${level.volume} @ ${level.price}`);
  }
});
```

#### Event Types

```typescript
interface MarketQuote {
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

interface MarketTrade {
  symbolId: string;
  price: number;
  timestamp: string;
  type: 0 | 1;        // 0 = Bid, 1 = Ask
  volume: number;
}

interface MarketDepth {
  price: number;
  volume: number;
  currentVolume: number;
  type: number;
  timestamp: string;
}
```

---

### User Hub (Real-time Account Data)

Access via `client.userHub`

Subscribe to real-time account updates via WebSocket.

#### Subscribing

```typescript
// Subscribe to all account updates
await client.userHub.subscribe(accountId);

// Or subscribe selectively
await client.userHub.subscribeOrders(accountId);
await client.userHub.subscribePositions(accountId);
await client.userHub.subscribeTrades(accountId);
```

#### Unsubscribing

```typescript
await client.userHub.unsubscribe(accountId);
```

#### Events

```typescript
// Order updates
client.userHub.on('order', (order) => {
  console.log(`Order ${order.id}: ${order.status}`);
});

// Position updates
client.userHub.on('position', (position) => {
  console.log(`Position: ${position.size} contracts @ ${position.averagePrice}`);
});

// Trade executions
client.userHub.on('trade', (trade) => {
  console.log(`Trade: ${trade.size} @ ${trade.price}, P&L: ${trade.profitAndLoss}`);
});

// Account updates
client.userHub.on('account', (account) => {
  console.log(`Account ${account.name}: Can trade = ${account.canTrade}`);
});
```

---

## Enums

```typescript
import {
  OrderType,
  OrderSide,
  OrderStatus,
  BarUnit,
  PositionType,
  TradeType,
} from 'topstepx-api';

// OrderType
OrderType.Limit      // 1
OrderType.Market     // 2
OrderType.Stop       // 3
OrderType.StopLimit  // 4

// OrderSide
OrderSide.Buy        // 0
OrderSide.Sell       // 1

// OrderStatus
OrderStatus.Pending        // 0
OrderStatus.Working        // 1
OrderStatus.Filled         // 2
OrderStatus.Cancelled      // 3
OrderStatus.Rejected       // 4
OrderStatus.PartiallyFilled // 5

// BarUnit
BarUnit.Second       // 1
BarUnit.Minute       // 2
BarUnit.Hour         // 3
BarUnit.Day          // 4
BarUnit.Week         // 5
BarUnit.Month        // 6

// PositionType
PositionType.Long    // 0
PositionType.Short   // 1
```

---

## Error Handling

The library provides typed errors for different failure scenarios:

```typescript
import {
  TopstepXError,
  AuthenticationError,
  ApiError,
  ConnectionError,
} from 'topstepx-api';

try {
  await client.connect();
  await client.orders.place({ ... });
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Auth failed:', error.message, error.code);
  } else if (error instanceof ApiError) {
    console.error(`API error on ${error.endpoint}:`, error.message);
  } else if (error instanceof ConnectionError) {
    console.error('WebSocket error:', error.message);
  }
}
```

All errors extend `TopstepXError` and include:
- `message` - Error description
- `code` - Error code (if applicable)
- `timestamp` - When the error occurred
- `toJSON()` - Serialize for logging

---

## Complete Example

```typescript
import {
  TopstepXClient,
  OrderType,
  OrderSide,
  BarUnit,
  ApiError,
} from 'topstepx-api';
import 'dotenv/config';

async function main() {
  const client = new TopstepXClient({
    username: process.env.TOPSTEP_USERNAME!,
    apiKey: process.env.TOPSTEP_API_KEY!,
  });

  try {
    // Connect
    await client.connect();
    console.log('Connected to TopstepX');

    // Get accounts
    const accountsResponse = await client.accounts.search({ onlyActiveAccounts: true });
    const account = accountsResponse.accounts[0];
    console.log(`Using account: ${account.name} (${account.id})`);

    // Search for ES contract
    const contractsResponse = await client.contracts.search({
      searchText: 'ES',
      live: false,
    });
    const esContract = contractsResponse.contracts.find(c => c.activeContract);
    console.log(`Found contract: ${esContract?.id}`);

    // Get historical data
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

    const barsResponse = await client.history.retrieveBars({
      contractId: esContract!.id,
      live: false,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      unit: BarUnit.Hour,
      unitNumber: 1,
      limit: 24,
      includePartialBar: false,
    });
    console.log(`Retrieved ${barsResponse.bars.length} hourly bars`);

    // Subscribe to real-time quotes
    client.marketHub.on('quote', ({ contractId, data }) => {
      const quote = data[0];
      console.log(`${contractId}: ${quote.bestBid} / ${quote.bestAsk}`);
    });
    await client.marketHub.subscribeQuotes(esContract!.id);

    // Subscribe to account updates
    client.userHub.on('order', (order) => {
      console.log(`Order update: ${order.id} - ${order.status}`);
    });
    await client.userHub.subscribe(account.id);

    // Place a limit order
    const order = await client.orders.place({
      accountId: account.id,
      contractId: esContract!.id,
      type: OrderType.Limit,
      side: OrderSide.Buy,
      size: 1,
      limitPrice: barsResponse.bars[barsResponse.bars.length - 1].c - 10, // 10 points below last close
    });
    console.log(`Placed order: ${order.orderId}`);

    // Check open orders
    const openOrdersResponse = await client.orders.searchOpen({ accountId: account.id });
    console.log(`Open orders: ${openOrdersResponse.orders.length}`);

    // Cancel the order
    await client.orders.cancel({
      accountId: account.id,
      orderId: order.orderId,
    });
    console.log('Order cancelled');

    // Keep running for real-time updates
    await new Promise(resolve => setTimeout(resolve, 30000));

  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error [${error.endpoint}]: ${error.message}`);
    } else {
      console.error('Error:', error);
    }
  } finally {
    await client.disconnect();
    console.log('Disconnected');
  }
}

main();
```

---

## TypeScript Support

All types are exported for full TypeScript support:

```typescript
import type {
  // Config
  TopstepXClientConfig,
  TopstepXClientEvents,

  // REST types
  Account,
  Order,
  Position,
  Trade,
  Contract,
  Bar,

  // Response types
  SearchAccountsResponse,
  PlaceOrderResponse,
  CancelOrderResponse,
  ModifyOrderResponse,
  SearchOrdersResponse,
  SearchOpenOrdersResponse,
  SearchOpenPositionsResponse,
  ClosePositionResponse,
  PartialClosePositionResponse,
  SearchTradesResponse,
  SearchContractsResponse,
  SearchContractByIdResponse,
  RetrieveBarsResponse,

  // Request types
  PlaceOrderRequest,
  ModifyOrderRequest,
  SearchOrdersRequest,
  RetrieveBarsRequest,

  // WebSocket types
  MarketQuote,
  MarketTrade,
  MarketDepth,
  OrderUpdate,
  PositionUpdate,
  TradeUpdate,
} from 'topstepx-api';
```

---

## License

MIT
