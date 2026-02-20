import {BarUnitEnum} from "../bar.unit.enum";

export interface RetrieveBarsRequestInterface {
  contractId: string;
  live: boolean;
  startTime: string;
  endTime: string;
  unit: BarUnitEnum;
  unitNumber: number;
  limit: number;
  includePartialBar: boolean;
}
