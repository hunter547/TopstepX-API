import type { HttpClient } from "../http-client";
import type {
  SearchContractsRequest,
  SearchContractsResponse,
  SearchContractByIdRequest,
  SearchContractByIdResponse,
} from "./types";

export class ContractApi {
  constructor(private readonly http: HttpClient) {}

  async search(
    request: SearchContractsRequest,
  ): Promise<SearchContractsResponse> {
    const response = await this.http.post<
      SearchContractsRequest,
      SearchContractsResponse
    >("/api/Contract/search", request);
    return response;
  }

  async searchById(
    request: SearchContractByIdRequest,
  ): Promise<SearchContractByIdResponse | null> {
    const response = await this.http.post<
      SearchContractByIdRequest,
      SearchContractByIdResponse
    >("/api/Contract/searchById", request);
    return response;
  }
}
