import type { OrderType, OrderSide, OrderStatus } from "../../types/enums";

export interface Order {
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

export interface PlaceOrderRequest {
  accountId: number;
  contractId: string;
  type: OrderType;
  side: OrderSide;
  size: number;
  limitPrice?: number | null;
  stopPrice?: number | null;
  trailPrice?: number | null;
  customTag?: string | null;
  linkedOrderId?: number | null;
}

export interface PlaceOrderResponse {
  orderId: number;
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

export interface SearchOrdersRequest {
  accountId: number;
  startTimestamp?: string;
  endTimestamp?: string;
}

export interface SearchOrdersResponse {
  orders: Order[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

export interface SearchOpenOrdersRequest {
  accountId: number;
}

export interface SearchOpenOrdersResponse {
  orders: Order[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

export interface CancelOrderRequest {
  accountId: number;
  orderId: number;
}

export interface CancelOrderResponse {
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

export interface ModifyOrderRequest {
  accountId: number;
  orderId: number;
  size?: number;
  limitPrice?: number | null;
  stopPrice?: number | null;
  trailPrice?: number | null;
}

export interface ModifyOrderResponse {
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
