import { AuthenticationError } from "../errors";
import { AuthConfigInterface } from "./auth.config.interface";
import { AuthLoginRequestInterface } from "./login/auth.login.request.interface";
import { AuthLoginResponseInterface } from "./login/auth.login.response.interface";

export class AuthService {
  private sessionToken: string | null = null;
  private tokenExpiration: Date | null = null;
  private refreshTimer?: ReturnType<typeof setTimeout>;
  private readonly config: Required<AuthConfigInterface>;

  constructor(config: AuthConfigInterface) {
    this.config = {
      username: config.username,
      apiKey: config.apiKey,
      baseUrl: config.baseUrl ?? "https://api.topstepx.com",
      autoRefresh: config.autoRefresh ?? true,
      tokenValidityHours: config.tokenValidityHours ?? 24,
    };
  }

  async login(): Promise<void> {
    const request: AuthLoginRequestInterface = {
      userName: this.config.username,
      apiKey: this.config.apiKey,
    };

    const response = await fetch(`${this.config.baseUrl}/api/Auth/loginKey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new AuthenticationError(
        `HTTP error during login: ${response.status}`,
        response.status,
      );
    }

    const data = (await response.json()) as AuthLoginResponseInterface;

    if (!data.success || data.errorCode !== 0) {
      throw new AuthenticationError(
        data.errorMessage ?? "Login failed",
        data.errorCode,
      );
    }

    this.sessionToken = data.token;
    this.setTokenExpiration();

    if (this.config.autoRefresh) {
      this.scheduleTokenRefresh();
    }
  }

  async validate(): Promise<boolean> {
    if (!this.sessionToken) return false;

    try {
      const response = await fetch(`${this.config.baseUrl}/api/Auth/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
          Authorization: `Bearer ${this.sessionToken}`,
        },
      });

      if (response.ok) {
        this.setTokenExpiration();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async getSessionToken(): Promise<string> {
    if (!this.sessionToken || this.isTokenExpired()) {
      const isValid = await this.validate();
      if (!isValid) {
        await this.login();
      }
    }

    if (!this.sessionToken) {
      throw new AuthenticationError("No active session token available");
    }

    return this.sessionToken;
  }

  get baseUrl(): string {
    return this.config.baseUrl;
  }

  private setTokenExpiration(): void {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + this.config.tokenValidityHours);
    this.tokenExpiration = expiration;
  }

  private isTokenExpired(): boolean {
    if (!this.tokenExpiration) return true;
    // Check with 5 minute buffer
    const buffer = 5 * 60 * 1000;
    return Date.now() >= this.tokenExpiration.getTime() - buffer;
  }

  private scheduleTokenRefresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    if (!this.tokenExpiration) return;

    // Refresh 10 minutes before expiration
    const refreshTime =
      this.tokenExpiration.getTime() - Date.now() - 10 * 60 * 1000;

    if (refreshTime > 0) {
      this.refreshTimer = setTimeout(async () => {
        try {
          const isValid = await this.validate();
          if (!isValid) {
            await this.login();
          }
          this.scheduleTokenRefresh();
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      }, refreshTime);
    }
  }

  destroy(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    this.sessionToken = null;
    this.tokenExpiration = null;
  }
}
