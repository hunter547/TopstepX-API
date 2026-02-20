import type { HttpClient } from "../http-client";
import { SearchTradesRequestInterface } from "./search/request/search.trades.request.interface";
import { SearchTradesResponseInterface } from "./search/response/search.trades.response.interface";

export class TradeApi {
  constructor(private readonly http: HttpClient) {}

  async search(
    request: SearchTradesRequestInterface,
  ): Promise<SearchTradesResponseInterface> {
    const response = await this.http.post<
      SearchTradesRequestInterface,
      SearchTradesResponseInterface
    >("/api/Trade/search", request);
    return response;
  }
}
