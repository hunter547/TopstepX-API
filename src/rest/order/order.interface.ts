import type { OrderStatusEnum } from "../../shared";
import {OrderTypeEnum} from "../../shared/order.type.enum";
import {OrderSideEnum} from "../../shared/order.side.enum";

export interface OrderInterface {
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
