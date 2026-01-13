import type { PositionType } from '../../types/enums';

export interface Position {
  id: number;
  accountId: number;
  contractId: string;
  creationTimestamp: string;
  type: PositionType;
  size: number;
  averagePrice: number;
}

export interface SearchOpenPositionsRequest {
  accountId: number;
}

export interface SearchOpenPositionsResponse {
  positions: Position[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

export interface ClosePositionRequest {
  accountId: number;
  contractId: string;
}

export interface ClosePositionResponse {
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

export interface PartialClosePositionRequest {
  accountId: number;
  contractId: string;
  size: number;
}

export interface PartialClosePositionResponse {
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
