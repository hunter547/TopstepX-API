export interface Contract {
  id: string;
  name: string;
  description: string;
  tickSize: number;
  tickValue: number;
  activeContract: boolean;
}

export interface SearchContractsRequest {
  searchText: string;
  live: boolean;
}

export interface SearchContractsResponse {
  contracts: Contract[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

export interface SearchContractByIdRequest {
  contractId: string;
  live: boolean;
}

export interface SearchContractByIdResponse {
  contract: Contract | null;
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
