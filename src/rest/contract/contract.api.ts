import type { HttpClient } from "../http-client";
import { SearchContractsRequestInterface } from "./search/request/search.contracts.request.interface";
import { SearchContractsResponseInterface } from "./search/response/search.contracts.response.interface";
import { SearchContractByIdResponseInterface } from "./search/response/search.contract.by.id.request.interface";
import { SearchContractByIdRequestInterface } from "./search/request/search.contract.by.id.request.interface";

export class ContractApi {
  constructor(private readonly http: HttpClient) {}

  async search(
    request: SearchContractsRequestInterface,
  ): Promise<SearchContractsResponseInterface> {
    const response = await this.http.post<
      SearchContractsRequestInterface,
      SearchContractsResponseInterface
    >("/api/Contract/search", request);
    return response;
  }

  async searchById(
    request: SearchContractByIdRequestInterface,
  ): Promise<SearchContractByIdResponseInterface | null> {
    const response = await this.http.post<
      SearchContractByIdRequestInterface,
      SearchContractByIdResponseInterface
    >("/api/Contract/searchById", request);
    return response;
  }
}
