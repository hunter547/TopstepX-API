# Migration Guide: v1.x to v2.0.0

This guide helps you migrate from TopstepX-API v1.x to v2.0.0.

## Overview

Version 2.0.0 is a **MAJOR** release that refactors **internal file structure, file naming conventions, and exported type/enum names**. All exported interfaces now have an `Interface` suffix and all exported enums now have an `Enum` suffix. Internal files were reorganized from generic `types.ts` files into explicit, descriptive files.

**All users will need to update their imports** to use the new names.

## What Changed

### 1. Renamed Exports (Interfaces and Enums)

Every exported interface and enum has been renamed to follow a consistent naming convention:

- **Interfaces** now end with `Interface`
- **Enums** now end with `Enum`

#### Enum Renames

| v1.x | v2.0.0 |
|------|--------|
| `OrderType` | `OrderTypeEnum` |
| `OrderSide` | `OrderSideEnum` |
| `OrderStatus` | `OrderStatusEnum` |
| `BarUnit` | `BarUnitEnum` |

#### Domain Model Renames

| v1.x | v2.0.0 |
|------|--------|
| `Account` | `AccountInterface` |
| `Contract` | `ContractInterface` |
| `Order` | `OrderInterface` |
| `Position` | `PositionInterface` |
| `Trade` | `TradeInterface` |
| `Bar` | `BarInterface` |

#### Auth Type Renames

| v1.x | v2.0.0 |
|------|--------|
| `AuthConfig` | `AuthConfigInterface` |
| `LoginResponse` | `AuthLoginResponseInterface` |
| `ValidateResponse` | `AuthValidateResponseInterface` |

> **New in v2.0.0:** `AuthLoginRequestInterface` (no v1.x equivalent)

#### REST Request/Response Renames

**Account:**

| v1.x | v2.0.0 |
|------|--------|
| `SearchAccountsRequest` | `SearchAccountsRequestInterface` |
| `SearchAccountsResponse` | `SearchAccountsResponseInterface` |

**Order:**

| v1.x | v2.0.0 |
|------|--------|
| `PlaceOrderRequest` | `PlaceOrderRequestInterface` |
| `PlaceOrderResponse` | `PlaceOrderResponseInterface` |
| `ModifyOrderRequest` | `ModifyOrderRequestInterface` |
| `ModifyOrderResponse` | `ModifyOrderResponseInterface` |
| `CancelOrderRequest` | `CancelOrderRequestInterface` |
| `CancelOrderResponse` | `CancelOrderResponseInterface` |
| `SearchOrdersRequest` | `SearchOrdersRequestInterface` |
| `SearchOrdersResponse` | `SearchOrdersResponseInterface` |
| `SearchOpenOrdersRequest` | `SearchOpenOrdersRequestInterface` |

> **New in v2.0.0:** `SearchOpenOrdersResponseInterface` (was not exported in v1.x)

**Position:**

| v1.x | v2.0.0 |
|------|--------|
| `SearchOpenPositionsRequest` | `SearchOpenPositionsRequestInterface` |
| `SearchOpenPositionsResponse` | `SearchOpenPositionsResponseInterface` |
| `ClosePositionRequest` | `ClosePositionRequestInterface` |
| `ClosePositionResponse` | `ClosePositionResponseInterface` |
| `PartialClosePositionRequest` | `PartialClosePositionRequestInterface` |
| `PartialClosePositionResponse` | `PartialClosePositionResponseInterface` |

**Trade:**

| v1.x | v2.0.0 |
|------|--------|
| `SearchTradesRequest` | `SearchTradesRequestInterface` |
| `SearchTradesResponse` | `SearchTradesResponseInterface` |

**Contract:**

| v1.x | v2.0.0 |
|------|--------|
| `SearchContractsRequest` | `SearchContractsRequestInterface` |
| `SearchContractsResponse` | `SearchContractsResponseInterface` |
| `SearchContractByIdRequest` | `SearchContractByIdRequestInterface` |
| `SearchContractByIdResponse` | `SearchContractByIdResponseInterface` |

**History:**

| v1.x | v2.0.0 |
|------|--------|
| `RetrieveBarsRequest` | `RetrieveBarsRequestInterface` |
| `RetrieveBarsResponse` | `RetrieveBarsResponseInterface` |

#### Realtime Type Renames

| v1.x | v2.0.0 |
|------|--------|
| `MarketQuote` | `RealtimeMarketQuoteEventInterface` |
| `MarketTrade` | `RealtimeMarketTradeEventInterface` |
| `MarketDepth` | `RealtimeMarketDepthEventInterface` |
| `MarketHubEvents` | `RealtimeMarketEventHubInterface` |
| `UserHubEvents` | `RealtimeUserEventHubInterface` |

> **New in v2.0.0:** `RealtimeMarketEventInterface`, `RealtimeUserOrderUpdateInterface`, `RealtimeUserPositionUpdateInterface`, `RealtimeUserTradeUpdateInterface`, `RealtimeUserAccountUpdateInterface`, `ConnectionManagerConfigInterface`

#### Unchanged Exports

The following class and utility names did **not** change:

- `TopstepXClient`
- `AuthService`
- `HttpClient`
- `AccountApi`, `OrderApi`, `PositionApi`, `TradeApi`, `ContractApi`, `HistoryApi`
- `ConnectionManager`
- `RealtimeMarketEventHub`, `RealtimeUserEventHub`
- `TopstepXError`, `AuthenticationError`, `ApiError`, `ConnectionError`
- `TypedEventEmitter`
- `ApiResponse`, `TopstepXClientConfig`, `TopstepXClientEvents`
- `CME_CONTRACTS`, `CmeContractStore`

### 2. Internal File Structure Refactoring

The entire codebase was reorganized from generic `types.ts` files to explicit, descriptive interface files.

#### Example: Order Module

**v1.x File Structure:**
```
src/rest/order/
├── order.api.ts
├── types.ts          # All interfaces in one file
└── index.ts
```

**v2.0.0 File Structure:**
```
src/rest/order/
├── order.api.ts
├── order.interface.ts                                    # OrderInterface
├── place/
│   ├── request/place.order.request.interface.ts         # PlaceOrderRequestInterface
│   └── response/place.order.response.interface.ts       # PlaceOrderResponseInterface
├── cancel/
│   ├── request/cancel.order.request.interface.ts        # CancelOrderRequestInterface
│   └── response/cancel.order.response.interface.ts      # CancelOrderResponseInterface
├── modify/
│   ├── request/modify.order.request.interface.ts        # ModifyOrderRequestInterface
│   └── response/modify.order.response.interface.ts      # ModifyOrderResponseInterface
├── search/
│   ├── request/search.orders.request.interface.ts       # SearchOrdersRequestInterface
│   ├── response/search.orders.response.interface.ts     # SearchOrdersResponseInterface
│   └── open/
│       ├── request/search.open.orders.request.interface.ts
│       └── response/search.open.orders.response.interface.ts
└── index.ts
```

#### File Naming Convention Changes

All files now follow a consistent **dot-notation** pattern:

| Category | v1.x Pattern | v2.0.0 Pattern | Example |
|----------|-------------|----------------|---------|
| Interfaces | `types.ts` | `*.interface.ts` | `order.interface.ts` |
| Enums | `enums.ts` | `*.enum.ts` | `order.side.enum.ts` |
| Errors | `error-name.ts` | `*.error.ts` | `api.error.ts` |
| Hubs | `hub-name.ts` | `*.event.hub.ts` | `realtime.market.event.hub.ts` |
| Requests | N/A | `*.request.interface.ts` | `place.order.request.interface.ts` |
| Responses | N/A | `*.response.interface.ts` | `place.order.response.interface.ts` |

#### Deleted Files

All generic `types.ts` files were removed and split into explicit interface files:

- `src/types/enums.ts`
- `src/types/common.ts`
- `src/types/index.ts`
- `src/auth/types.ts`
- `src/rest/account/types.ts`
- `src/rest/order/types.ts`
- `src/rest/position/types.ts`
- `src/rest/trade/types.ts`
- `src/rest/history/types.ts`
- `src/rest/contract/types.ts`
- `src/realtime/market/types.ts`
- `src/realtime/user/types.ts`

### 3. Renamed Error Files

Error class files renamed from kebab-case to dot-notation:

| v1.x | v2.0.0 |
|------|--------|
| `api-error.ts` | `api.error.ts` |
| `auth-error.ts` | `auth.error.ts` |
| `base-error.ts` | `base.error.ts` |
| `connection-error.ts` | `connection.error.ts` |

### 4. Renamed Hub Files

| v1.x | v2.0.0 |
|------|--------|
| `market-hub.ts` | `realtime.market.event.hub.ts` |
| `user-hub.ts` | `realtime.user.event.hub.ts` |

### 5. Renamed Client File

| v1.x | v2.0.0 |
|------|--------|
| `client.ts` | `topstep.x.client.ts` |

## New Features in v2.0.0

### CME Contract Information

New comprehensive CME contract data with tick sizes, tick values, and fees:

```typescript
import {
  CME_CONTRACTS,
  CmeContractStore,
  CmeContractSymbolEnum,
  CmeContractSectorEnum,
} from "topstepx-api";

// Use the contract store
const store = new CmeContractStore();

// Get contract by symbol
const esContract = store.getContractBySymbol(CmeContractSymbolEnum.E_MINI_SP_500);
console.log(esContract?.tickSize); // 0.25
console.log(esContract?.tickValue); // 12.5
console.log(esContract?.roundTripFees); // 2.8 (TopstepX fees)

// Get all equity contracts
const equityContracts = store.getContractsBySector(CmeContractSectorEnum.EQUITY);

// Get all available sectors
const sectors = store.getSectors();
```

**Available contract data:**
- 60+ CME futures contracts (ES, NQ, CL, GC, ZN, etc.)
- Tick size (minimum price fluctuation)
- Tick value (dollar value per tick)
- Round-trip fees (TopstepX commissions)
- Contract sector and exchange information

## Migration Steps

### Step 1: Update Package Version

```bash
npm install topstepx-api@2.0.0
# or
yarn add topstepx-api@2.0.0
```

### Step 2: Update Enum Imports

```typescript
// v1.x
import { OrderType, OrderSide, OrderStatus, BarUnit } from "topstepx-api";

// v2.0.0
import { OrderTypeEnum, OrderSideEnum, OrderStatusEnum, BarUnitEnum } from "topstepx-api";
```

### Step 3: Update Interface Imports

```typescript
// v1.x
import type { Order, Position, Trade, Account, Contract, Bar } from "topstepx-api";

// v2.0.0
import type {
  OrderInterface,
  PositionInterface,
  TradeInterface,
  AccountInterface,
  ContractInterface,
  BarInterface,
} from "topstepx-api";
```

### Step 4: Update Request/Response Imports

```typescript
// v1.x
import type {
  PlaceOrderRequest,
  PlaceOrderResponse,
  SearchOrdersRequest,
  SearchOrdersResponse,
  ClosePositionRequest,
  ClosePositionResponse,
} from "topstepx-api";

// v2.0.0
import type {
  PlaceOrderRequestInterface,
  PlaceOrderResponseInterface,
  SearchOrdersRequestInterface,
  SearchOrdersResponseInterface,
  ClosePositionRequestInterface,
  ClosePositionResponseInterface,
} from "topstepx-api";
```

### Step 5: Update Auth Type Imports

```typescript
// v1.x
import type { AuthConfig, LoginResponse, ValidateResponse } from "topstepx-api";

// v2.0.0
import type {
  AuthConfigInterface,
  AuthLoginResponseInterface,
  AuthValidateResponseInterface,
} from "topstepx-api";
```

### Step 6: Update Realtime Type Imports

```typescript
// v1.x
import type {
  MarketQuote,
  MarketTrade,
  MarketDepth,
  MarketHubEvents,
  UserHubEvents,
} from "topstepx-api";

// v2.0.0
import type {
  RealtimeMarketQuoteEventInterface,
  RealtimeMarketTradeEventInterface,
  RealtimeMarketDepthEventInterface,
  RealtimeMarketEventHubInterface,
  RealtimeUserEventHubInterface,
} from "topstepx-api";
```

### Step 7: Update Enum Value References in Code

Enum member names are unchanged, but the enum itself is renamed:

```typescript
// v1.x
const order = {
  type: OrderType.Limit,
  side: OrderSide.Buy,
};

if (order.status === OrderStatus.Filled) { ... }

// v2.0.0
const order = {
  type: OrderTypeEnum.Limit,
  side: OrderSideEnum.Buy,
};

if (order.status === OrderStatusEnum.Filled) { ... }
```

### Step 8: Clear TypeScript Cache

TypeScript may cache old file paths. Clear the cache:

```bash
# Delete TypeScript build cache
rm -rf node_modules/.cache

# Or restart your TypeScript server in VS Code
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

### Step 9: Test Your Application

```bash
# Run TypeScript compiler
npx tsc --noEmit

# Run your tests
npm test

# Build your application
npm run build
```

## Quick Find/Replace Reference

For a fast migration, apply these find/replace operations across your codebase:

| Find | Replace |
|------|---------|
| `OrderType` | `OrderTypeEnum` |
| `OrderSide` | `OrderSideEnum` |
| `OrderStatus` | `OrderStatusEnum` |
| `BarUnit` | `BarUnitEnum` |
| `Account` (type only) | `AccountInterface` |
| `Contract` (type only) | `ContractInterface` |
| `Order` (type only) | `OrderInterface` |
| `Position` (type only) | `PositionInterface` |
| `Trade` (type only) | `TradeInterface` |
| `Bar` (type only) | `BarInterface` |
| `AuthConfig` | `AuthConfigInterface` |
| `LoginResponse` | `AuthLoginResponseInterface` |
| `ValidateResponse` | `AuthValidateResponseInterface` |
| `PlaceOrderRequest` | `PlaceOrderRequestInterface` |
| `PlaceOrderResponse` | `PlaceOrderResponseInterface` |
| `ModifyOrderRequest` | `ModifyOrderRequestInterface` |
| `ModifyOrderResponse` | `ModifyOrderResponseInterface` |
| `CancelOrderRequest` | `CancelOrderRequestInterface` |
| `CancelOrderResponse` | `CancelOrderResponseInterface` |
| `SearchOrdersRequest` | `SearchOrdersRequestInterface` |
| `SearchOrdersResponse` | `SearchOrdersResponseInterface` |
| `SearchOpenOrdersRequest` | `SearchOpenOrdersRequestInterface` |
| `SearchAccountsRequest` | `SearchAccountsRequestInterface` |
| `SearchAccountsResponse` | `SearchAccountsResponseInterface` |
| `SearchOpenPositionsRequest` | `SearchOpenPositionsRequestInterface` |
| `SearchOpenPositionsResponse` | `SearchOpenPositionsResponseInterface` |
| `ClosePositionRequest` | `ClosePositionRequestInterface` |
| `ClosePositionResponse` | `ClosePositionResponseInterface` |
| `PartialClosePositionRequest` | `PartialClosePositionRequestInterface` |
| `PartialClosePositionResponse` | `PartialClosePositionResponseInterface` |
| `SearchTradesRequest` | `SearchTradesRequestInterface` |
| `SearchTradesResponse` | `SearchTradesResponseInterface` |
| `SearchContractsRequest` | `SearchContractsRequestInterface` |
| `SearchContractsResponse` | `SearchContractsResponseInterface` |
| `SearchContractByIdRequest` | `SearchContractByIdRequestInterface` |
| `SearchContractByIdResponse` | `SearchContractByIdResponseInterface` |
| `RetrieveBarsRequest` | `RetrieveBarsRequestInterface` |
| `RetrieveBarsResponse` | `RetrieveBarsResponseInterface` |
| `MarketQuote` | `RealtimeMarketQuoteEventInterface` |
| `MarketTrade` | `RealtimeMarketTradeEventInterface` |
| `MarketDepth` | `RealtimeMarketDepthEventInterface` |
| `MarketHubEvents` | `RealtimeMarketEventHubInterface` |
| `UserHubEvents` | `RealtimeUserEventHubInterface` |

> **Note:** Be careful with domain model renames (`Account`, `Order`, etc.) as these are common words. Use your IDE's "rename symbol" feature or restrict find/replace to import statements and type annotations.

## Troubleshooting

### TypeScript Errors After Upgrade

**Error:** `Cannot find name 'Order'` / `Cannot find name 'OrderType'`

**Solution:** Update to the new names with `Interface` or `Enum` suffixes:
```typescript
// v1.x
import type { Order } from "topstepx-api";
import { OrderType } from "topstepx-api";

// v2.0.0
import type { OrderInterface } from "topstepx-api";
import { OrderTypeEnum } from "topstepx-api";
```

**Error:** `Cannot find module 'topstepx-api/dist/rest/order/types'`

**Solution:** Update imports to use the main entry point:
```typescript
import type { OrderInterface } from "topstepx-api";
```

### IDE Auto-Import Not Working

**Problem:** IDE suggests old type names or file paths

**Solution:**
1. Restart your TypeScript server (VS Code: Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server")
2. Clear node_modules cache: `rm -rf node_modules/.cache`
3. Reload your editor

### Build Errors

**Problem:** Build fails with "Cannot find module" errors

**Solution:**
1. Delete `dist` and `node_modules` directories
2. Reinstall dependencies: `npm install`
3. Rebuild: `npm run build`

## Summary Table

| Change Category | Breaking? | Affected Users | Action Required |
|----------------|-----------|----------------|-----------------|
| Interface/Enum name suffixes | **Yes** | **All users** | **Rename all type/enum imports** |
| Internal file structure | Yes | Deep imports only | Update import paths |
| File naming (kebab -> dot) | Yes | Deep imports only | Update import paths |
| New CME contract features | No | Nobody | Optional adoption |

## Need Help?

- **Migration Issues:** Review this guide and the [CHANGELOG.md](./CHANGELOG.md)
- **Bug Reports:** Open an issue on [GitHub](https://github.com/nickmvincent/topstepx-api/issues)
- **Questions:** Check the updated [README.md](./README.md) for examples
