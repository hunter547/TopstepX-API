import type { HttpClient } from "../http-client";
import { SearchAccountsRequestInterface } from "./search/search.accounts.request.interface";
import { SearchAccountsResponseInterface } from "./search/search.accounts.response.interface";

export class AccountApi {
  constructor(private readonly http: HttpClient) {}

  async search(
    request: SearchAccountsRequestInterface,
  ): Promise<SearchAccountsResponseInterface> {
    const response = await this.http.post<
      SearchAccountsRequestInterface,
      SearchAccountsResponseInterface
    >("/api/Account/search", request);
    return response;
  }
}
