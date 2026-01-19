import type { HttpClient } from "../http-client";
import type { SearchAccountsRequest, SearchAccountsResponse } from "./types";

export class AccountApi {
  constructor(private readonly http: HttpClient) {}

  async search(
    request: SearchAccountsRequest,
  ): Promise<SearchAccountsResponse> {
    const response = await this.http.post<
      SearchAccountsRequest,
      SearchAccountsResponse
    >("/api/Account/search", request);
    return response;
  }
}
