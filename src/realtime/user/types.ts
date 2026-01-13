import type { OrderType, OrderSide, OrderStatus, PositionType } from '../../types/enums';

export interface OrderUpdate {
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

export interface PositionUpdate {
  id: number;
  accountId: number;
  contractId: string;
  creationTimestamp: string;
  type: PositionType;
  size: number;
  averagePrice: number;
}

export interface TradeUpdate {
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

export interface AccountUpdate {
  id: number;
  name: string;
  canTrade: boolean;
  balance: number;
}

export interface UserHubEvents {
  [key: string]: unknown;
  order: OrderUpdate;
  position: PositionUpdate;
  trade: TradeUpdate;
  account: AccountUpdate;
}
