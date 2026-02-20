import type { OrderStatusEnum } from "../../../shared";
import {OrderSideEnum, OrderTypeEnum} from "../../../rest/order";

export interface RealtimeUserOrderUpdateInterface {
  id: number;
  accountId: number;
  contractId: string;
  creationTimestamp: string;
  updateTimestamp: string | null;
  status: OrderStatusEnum;
  type: OrderTypeEnum;
  side: OrderSideEnum;
  size: number;
  limitPrice: number | null;
  stopPrice: number | null;
}
