export interface ModifyOrderRequestInterface {
  accountId: number;
  orderId: number;
  size?: number;
  limitPrice?: number | null;
  stopPrice?: number | null;
  trailPrice?: number | null;
}
