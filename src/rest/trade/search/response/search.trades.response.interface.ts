import { TradeInterface } from "../../trade.interface";

export interface SearchTradesResponseInterface {
  trades: TradeInterface[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
