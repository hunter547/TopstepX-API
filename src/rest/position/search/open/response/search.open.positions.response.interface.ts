import { PositionInterface } from "../../../position.interface";

export interface SearchOpenPositionsResponseInterface {
  positions: PositionInterface[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
