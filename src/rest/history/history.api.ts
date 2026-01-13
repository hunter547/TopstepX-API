import type { HttpClient } from '../http-client';
import type { Bar, RetrieveBarsRequest, RetrieveBarsResponse } from './types';

export class HistoryApi {
  constructor(private readonly http: HttpClient) {}

  async retrieveBars(request: RetrieveBarsRequest): Promise<Bar[]> {
    const response = await this.http.post<
      RetrieveBarsRequest,
      RetrieveBarsResponse
    >('/api/History/retrieveBars', request);
    return response.bars;
  }
}
