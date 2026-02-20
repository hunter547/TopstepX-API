import {OrderTypeEnum} from "../../../../shared/order.type.enum";
import {OrderSideEnum} from "../../../../shared/order.side.enum";

export interface PlaceOrderRequestInterface {
  accountId: number;
  contractId: string;
  type: OrderTypeEnum;
  side: OrderSideEnum;
  size: number;
  limitPrice?: number | null;
  stopPrice?: number | null;
  trailPrice?: number | null;
  customTag?: string | null;
  linkedOrderId?: number | null;
}
