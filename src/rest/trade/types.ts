import type { OrderSide } from '../../types/enums';

export interface Trade {
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

export interface SearchTradesRequest {
  accountId: number;
  startTimestamp: string;
  endTimestamp: string;
}

export interface SearchTradesResponse {
  trades: Trade[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
