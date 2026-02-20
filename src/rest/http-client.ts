import { ApiError } from "../errors";
import { HttpClientConfigInterface } from "./http-client.config.interface";

interface ApiResponseBase {
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}

export class HttpClient {
  private readonly config: Required<HttpClientConfigInterface>;

  constructor(config: HttpClientConfigInterface) {
    this.config = {
      baseUrl: config.baseUrl,
      getToken: config.getToken,
      timeout: config.timeout ?? 30000,
    };
  }

  async post<TRequest, TResponse extends ApiResponseBase>(
    endpoint: string,
    data: TRequest,
  ): Promise<TResponse> {
    const token = await this.config.getToken();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `HTTP error: ${response.status} ${response.statusText}`,
          response.status,
          endpoint,
        );
      }

      const result = (await response.json()) as TResponse;

      if (!result.success || result.errorCode !== 0) {
        throw new ApiError(
          result.errorMessage ?? "API request failed",
          result.errorCode,
          endpoint,
        );
      }

      return result;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) throw error;

      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError("Request timeout", -1, endpoint);
      }

      throw new ApiError(
        error instanceof Error ? error.message : "Unknown error",
        -1,
        endpoint,
      );
    }
  }
}
