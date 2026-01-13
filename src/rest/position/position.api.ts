import type { HttpClient } from '../http-client';
import type {
  Position,
  SearchOpenPositionsRequest,
  SearchOpenPositionsResponse,
  ClosePositionRequest,
  ClosePositionResponse,
  PartialClosePositionRequest,
  PartialClosePositionResponse,
} from './types';

export class PositionApi {
  constructor(private readonly http: HttpClient) {}

  async searchOpen(request: SearchOpenPositionsRequest): Promise<Position[]> {
    const response = await this.http.post<
      SearchOpenPositionsRequest,
      SearchOpenPositionsResponse
    >('/api/Position/searchOpen', request);
    return response.positions;
  }

  async close(request: ClosePositionRequest): Promise<ClosePositionResponse> {
    return this.http.post<ClosePositionRequest, ClosePositionResponse>(
      '/api/Position/closeContract',
      request
    );
  }

  async partialClose(
    request: PartialClosePositionRequest
  ): Promise<PartialClosePositionResponse> {
    return this.http.post<
      PartialClosePositionRequest,
      PartialClosePositionResponse
    >('/api/Position/partialCloseContract', request);
  }
}
