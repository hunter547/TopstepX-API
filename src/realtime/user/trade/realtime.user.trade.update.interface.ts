import {OrderSideEnum} from "../../../rest/order";

export interface RealtimeUserTradeUpdateInterface {
  id: number;
  accountId: number;
  contractId: string;
  creationTimestamp: string;
  price: number;
  profitAndLoss: number | null;
  fees: number;
  side: OrderSideEnum;
  size: number;
  voided: boolean;
  orderId: number;
}
