export interface AuthLoginResponseInterface {
  token: string;
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
