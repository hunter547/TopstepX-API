import type { HttpClient } from '../http-client';
import type {
  Contract,
  SearchContractsRequest,
  SearchContractsResponse,
  SearchContractByIdRequest,
  SearchContractByIdResponse,
} from './types';

export class ContractApi {
  constructor(private readonly http: HttpClient) {}

  async search(request: SearchContractsRequest): Promise<Contract[]> {
    const response = await this.http.post<
      SearchContractsRequest,
      SearchContractsResponse
    >('/api/Contract/search', request);
    return response.contracts;
  }

  async searchById(
    request: SearchContractByIdRequest
  ): Promise<Contract | null> {
    const response = await this.http.post<
      SearchContractByIdRequest,
      SearchContractByIdResponse
    >('/api/Contract/searchById', request);
    return response.contract;
  }
}
