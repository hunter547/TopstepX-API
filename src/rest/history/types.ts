import type { BarUnit } from '../../types/enums';

export interface Bar {
  t: string; // timestamp
  o: number; // open
  h: number; // high
  l: number; // low
  c: number; // close
  v: number; // volume
}

export interface RetrieveBarsRequest {
  contractId: string;
  live: boolean;
  startTime: string;
  endTime: string;
  unit: BarUnit;
  unitNumber: number;
  limit: number;
  includePartialBar: boolean;
}

export interface RetrieveBarsResponse {
  bars: Bar[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
