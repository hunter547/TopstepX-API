import type { PositionTypeEnum } from "../../../shared";

export interface RealtimeUserPositionUpdateInterface {
  id: number;
  accountId: number;
  contractId: string;
  creationTimestamp: string;
  type: PositionTypeEnum;
  size: number;
  averagePrice: number;
}
