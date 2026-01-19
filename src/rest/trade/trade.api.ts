import type { HttpClient } from "../http-client";
import type { SearchTradesRequest, SearchTradesResponse } from "./types";

export class TradeApi {
  constructor(private readonly http: HttpClient) {}

  async search(request: SearchTradesRequest): Promise<SearchTradesResponse> {
    const response = await this.http.post<
      SearchTradesRequest,
      SearchTradesResponse
    >("/api/Trade/search", request);
    return response;
  }
}
