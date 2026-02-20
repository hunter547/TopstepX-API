export interface ApiResponse<T = unknown> {
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
  [key: string]: T | boolean | number | string | null | undefined;
}

export interface TopstepXClientConfig {
  username: string;
  apiKey: string;
  baseUrl?: string;
  marketHubUrl?: string;
  userHubUrl?: string;
  autoRefresh?: boolean;
  tokenValidityHours?: number;
}

export interface TopstepXClientEvents {
  [key: string]: unknown;
  connected: void;
  disconnected: void;
  error: Error;
  reconnecting: void;
  reconnected: void;
}
