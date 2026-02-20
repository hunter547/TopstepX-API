export interface AuthConfigInterface {
  username: string;
  apiKey: string;
  baseUrl?: string;
  autoRefresh?: boolean;
  tokenValidityHours?: number;
}
