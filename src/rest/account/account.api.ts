import type { HttpClient } from '../http-client';
import type {
  Account,
  SearchAccountsRequest,
  SearchAccountsResponse,
} from './types';

export class AccountApi {
  constructor(private readonly http: HttpClient) {}

  async search(request: SearchAccountsRequest): Promise<Account[]> {
    const response = await this.http.post<
      SearchAccountsRequest,
      SearchAccountsResponse
    >('/api/Account/search', request);
    return response.accounts;
  }
}
