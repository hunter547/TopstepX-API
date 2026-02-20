import type { HttpClient } from "../http-client";
import { SearchOpenPositionsRequestInterface } from "./search/open/request/search.open.positions.request.interface";
import { SearchOpenPositionsResponseInterface } from "./search/open/response/search.open.positions.response.interface";
import { ClosePositionRequestInterface } from "./close/request/close.position.request.interface";
import { ClosePositionResponseInterface } from "./close/response/close.position.response.interface";
import { PartialClosePositionRequestInterface } from "./partial/close/request/partial.close.position.request.interface";
import { PartialClosePositionResponseInterface } from "./partial/close/response/partial.close.position.response.interface";

export class PositionApi {
  constructor(private readonly http: HttpClient) {}

  async searchOpen(
    request: SearchOpenPositionsRequestInterface,
  ): Promise<SearchOpenPositionsResponseInterface> {
    const response = await this.http.post<
      SearchOpenPositionsRequestInterface,
      SearchOpenPositionsResponseInterface
    >("/api/Position/searchOpen", request);
    return response;
  }

  async close(
    request: ClosePositionRequestInterface,
  ): Promise<ClosePositionResponseInterface> {
    return this.http.post<
      ClosePositionRequestInterface,
      ClosePositionResponseInterface
    >("/api/Position/closeContract", request);
  }

  async partialClose(
    request: PartialClosePositionRequestInterface,
  ): Promise<PartialClosePositionResponseInterface> {
    return this.http.post<
      PartialClosePositionRequestInterface,
      PartialClosePositionResponseInterface
    >("/api/Position/partialCloseContract", request);
  }
}
