export interface AuthConfig {
  username: string;
  apiKey: string;
  baseUrl?: string;
  autoRefresh?: boolean;
  tokenValidityHours?: number;
}

export interface LoginRequest {
  userName: string;
  apiKey: string;
}

export interface LoginResponse {
  token: string;
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

export interface ValidateResponse {
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
