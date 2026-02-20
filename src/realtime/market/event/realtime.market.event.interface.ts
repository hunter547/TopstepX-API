export interface RealtimeMarketEventInterface<T> {
  contractId: string;
  data: T[];
}
