import type { HttpClient } from '../http-client';
import type { Trade, SearchTradesRequest, SearchTradesResponse } from './types';

export class TradeApi {
  constructor(private readonly http: HttpClient) {}

  async search(request: SearchTradesRequest): Promise<Trade[]> {
    const response = await this.http.post<
      SearchTradesRequest,
      SearchTradesResponse
    >('/api/Trade/search', request);
    return response.trades;
  }
}
