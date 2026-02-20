# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-02-15

### 🚨 BREAKING CHANGES

This is a major release with comprehensive refactoring of file structure, file naming conventions, and exported type/enum names. **All exported interfaces now have an `Interface` suffix and all exported enums now have an `Enum` suffix.** All users will need to update their imports. See [MIGRATION.md](./MIGRATION.md) for detailed migration instructions.

#### Renamed All Exported Interfaces and Enums

All exported interfaces and enums have been renamed to follow a consistent naming convention:

- **Enums** now end with `Enum` (e.g., `OrderType` -> `OrderTypeEnum`, `OrderSide` -> `OrderSideEnum`, `OrderStatus` -> `OrderStatusEnum`, `BarUnit` -> `BarUnitEnum`)
- **Domain model interfaces** now end with `Interface` (e.g., `Order` -> `OrderInterface`, `Position` -> `PositionInterface`, `Account` -> `AccountInterface`, `Trade` -> `TradeInterface`, `Contract` -> `ContractInterface`, `Bar` -> `BarInterface`)
- **Auth types** renamed with `Interface` suffix and more descriptive names (e.g., `AuthConfig` -> `AuthConfigInterface`, `LoginResponse` -> `AuthLoginResponseInterface`, `ValidateResponse` -> `AuthValidateResponseInterface`)
- **All request/response interfaces** now end with `Interface` (e.g., `PlaceOrderRequest` -> `PlaceOrderRequestInterface`, `SearchOrdersResponse` -> `SearchOrdersResponseInterface`)
- **Realtime types** renamed with descriptive names and `Interface` suffix (e.g., `MarketQuote` -> `RealtimeMarketQuoteEventInterface`, `MarketHubEvents` -> `RealtimeMarketEventHubInterface`, `UserHubEvents` -> `RealtimeUserEventHubInterface`)

See [MIGRATION.md](./MIGRATION.md) for a complete rename table with every old and new name.

#### File Structure Changes

- **Renamed all error files** from kebab-case to dot-notation:
  - `api-error.ts` → `api.error.ts`
  - `auth-error.ts` → `auth.error.ts`
  - `base-error.ts` → `base.error.ts`
  - `connection-error.ts` → `connection.error.ts`

- **Renamed hub files** to follow dot-notation pattern:
  - `market-hub.ts` → `realtime.market.event.hub.ts`
  - `user-hub.ts` → `realtime.user.event.hub.ts`

- **Removed generic `types.ts` files** and replaced with explicit interface files:
  - `src/auth/types.ts` → Split into:
    - `auth.config.interface.ts`
    - `auth.validate.response.interface.ts`
    - `login/auth.login.request.interface.ts`
    - `login/auth.login.response.interface.ts`
  - `src/rest/account/types.ts` → Renamed to `account.interface.ts` and split into:
    - `search/search.accounts.request.interface.ts`
    - `search/search.accounts.response.interface.ts`
  - `src/rest/order/types.ts` → Renamed to `order.interface.ts` and split into:
    - `place/request/place.order.request.interface.ts`
    - `place/response/place.order.response.interface.ts`
    - `cancel/request/cancel.order.request.interface.ts`
    - `cancel/response/cancel.order.response.interface.ts`
    - `modify/request/modify.order.request.interface.ts`
    - `modify/response/modify.order.response.interface.ts`
    - `search/request/search.orders.request.interface.ts`
    - `search/response/search.orders.response.interface.ts`
    - `search/open/request/search.open.orders.request.interface.ts`
    - `search/open/response/search.open.orders.response.interface.ts`
  - `src/rest/position/types.ts` → Renamed to `position.interface.ts` and split into:
    - `close/request/close.position.request.interface.ts`
    - `close/response/close.position.response.interface.ts`
    - `partial/close/request/partial.close.position.request.interface.ts`
    - `partial/close/response/partial.close.position.response.interface.ts`
    - `search/open/request/search.open.positions.request.interface.ts`
    - `search/open/response/search.open.positions.response.interface.ts`
  - `src/rest/trade/types.ts` → Deleted and replaced with:
    - `trade.interface.ts`
    - `search/request/search.trades.request.interface.ts`
    - `search/response/search.trades.response.interface.ts`
  - `src/rest/history/types.ts` → Deleted and replaced with:
    - `bar/bar.interface.ts`
    - `bar/request/retrieve.bars.request.interface.ts`
    - `bar/response/retrieve.bars.response.interface.ts`
  - `src/rest/contract/types.ts` → Deleted and replaced with:
    - `contract.interface.ts`
    - `search/request/search.contracts.request.interface.ts`
    - `search/response/search.contracts.response.interface.ts`
    - `search/request/search.contract.by.id.request.interface.ts`
    - `search/response/search.contract.by.id.request.interface.ts`
  - `src/realtime/market/types.ts` → Deleted and replaced with:
    - `event/realtime.market.event.interface.ts`
    - `event/realtime.market.quote.event.interface.ts`
    - `event/realtime.market.trade.event.interface.ts`
    - `event/realtime.market.depth.event.interface.ts`
    - `realtime.market.event.hub.interface.ts`
  - `src/realtime/user/types.ts` → Deleted and replaced with:
    - `account/realtime.user.account.update.interface.ts`
    - `order/realtime.user.order.update.interface.ts`
    - `position/realtime.user.position.update.interface.ts`
    - `trade/realtime.user.trade.update.interface.ts`
    - `realtime.user.event.hub.interface.ts`

#### New Config Interface Files

- Added `src/rest/http-client.config.interface.ts` for HTTP client configuration
- Added `src/realtime/connection-manager.config.interface.ts` for connection manager configuration

### ✨ Added

#### CME Contract Information System

- **New CME contract constants and utilities** (`src/rest/contract/cme/`):
  - `CME_CONTRACTS` constant with complete contract specifications for all offered Topstep CME futures contracts
  - `CmeContractStore` class for easy contract lookups and filtering
  - `CmeContractInterface` with contract details including:
    - `symbol`: Contract symbol (e.g., 'ES', 'NQ', 'CL')
    - `name`: Full contract name
    - `sector`: Contract sector (Equity, FX, Metals, Energy, etc.)
    - `exchange`: Trading exchange (CME, CBOT, NYMEX, COMEX)
    - `tickSize`: Minimum price fluctuation
    - `tickValue`: Dollar value per tick
    - `roundTripFees`: TopstepX round-trip commission and fees
  - Contract sector enums: `EQUITY`, `FOREIGN_EXCHANGE`, `LIVE_STOCK`, `CROPS`, `GAS_AND_OIL`, `NOTES_AND_BONDS`, `METALS`, `CRYPTO`
  - Exchange enums: `CME`, `CBOT`, `NYMEX`, `COMEX`
  - Symbol enums for all supported contracts

**Example usage:**

```typescript
import { CME_CONTRACTS, CmeContractStore } from "topstepx-api";

const store = new CmeContractStore();
const esContract = store.getContractBySymbol("ES");
console.log(esContract?.tickSize); // 0.25
console.log(esContract?.tickValue); // 12.5
console.log(esContract?.roundTripFees); // 2.8
```

### 📖 Documentation

- Added comprehensive [MIGRATION.md](./MIGRATION.md) guide with:
  - Detailed breaking changes documentation
  - Step-by-step migration instructions
  - Before/after code examples
  - Migration impact assessment table

### ⚠️ Migration Notes

**IMPORTANT:** This is a breaking change that affects **all users**. All exported interfaces and enums have been renamed.

```typescript
// ❌ BREAKS in v2.0.0
import { TopstepXClient, OrderType } from "topstepx-api";
import type { Order, Position } from "topstepx-api";

// ✅ FIXED for v2.0.0
import { TopstepXClient, OrderTypeEnum } from "topstepx-api";
import type { OrderInterface, PositionInterface } from "topstepx-api";
```

**See [MIGRATION.md](./MIGRATION.md) for a complete migration guide with every rename listed.**

## [1.0.3] - 2026-01-23

### Changed

- Renamed `Quote` interface to `MarketQuote` to align with other real-time data feed interface names (`MarketTrade`, `MarketDepth`).

## [1.0.2] - 2026-01-19

### Fixed

- Fixed account, contract, history, order, position, and trade REST API responses to include `errorMessage`, `errorCode`, and `success` fields in the root of the response payload.

## [1.0.1] - 2026-01-19

### Fixed

- Fixed CommonJS (.cjs) exports not being included in the published package. The tsup build configuration now correctly outputs `index.cjs` for CommonJS and `index.js` for ESM, matching the package.json exports.

## [1.0.0] - 2025-01-17

### Added

- Initial release
- Full REST API coverage for TopstepX trading API
- Real-time WebSocket data feeds via Microsoft SignalR
- Automatic token management with refresh
- Complete TypeScript type definitions
- Dual ESM/CommonJS support
