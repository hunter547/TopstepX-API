import type { PositionTypeEnum } from "../../shared";

export interface PositionInterface {
  id: number;
  accountId: number;
  contractId: string;
  creationTimestamp: string;
  type: PositionTypeEnum;
  size: number;
  averagePrice: number;
}
