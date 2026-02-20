export interface HttpClientConfigInterface {
  baseUrl: string;
  getToken: () => Promise<string>;
  timeout?: number;
}
