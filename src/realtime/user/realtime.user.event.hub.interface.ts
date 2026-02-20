import { RealtimeUserOrderUpdateInterface } from "./order/realtime.user.order.update.interface";
import { RealtimeUserPositionUpdateInterface } from "./position/realtime.user.position.update.interface";
import { RealtimeUserTradeUpdateInterface } from "./trade/realtime.user.trade.update.interface";
import { RealtimeUserAccountUpdateInterface } from "./account/realtime.user.account.update.interface";

export interface RealtimeUserEventHubInterface {
  [key: string]: unknown;

  order: RealtimeUserOrderUpdateInterface;
  position: RealtimeUserPositionUpdateInterface;
  trade: RealtimeUserTradeUpdateInterface;
  account: RealtimeUserAccountUpdateInterface;
}
