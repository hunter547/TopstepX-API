export interface Account {
  id: number;
  name: string;
  canTrade: boolean;
  isVisible: boolean;
}

export interface SearchAccountsRequest {
  onlyActiveAccounts: boolean;
}

export interface SearchAccountsResponse {
  accounts: Account[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
