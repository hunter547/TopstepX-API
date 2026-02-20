import type { HttpClient } from "../http-client";
import { RetrieveBarsRequestInterface } from "./bar/request/retrieve.bars.request.interface";
import { RetrieveBarsResponseInterface } from "./bar/response/retrieve.bars.response.interface";

export class HistoryApi {
  constructor(private readonly http: HttpClient) {}

  async retrieveBars(
    request: RetrieveBarsRequestInterface,
  ): Promise<RetrieveBarsResponseInterface> {
    const response = await this.http.post<
      RetrieveBarsRequestInterface,
      RetrieveBarsResponseInterface
    >("/api/History/retrieveBars", request);
    return response;
  }
}
