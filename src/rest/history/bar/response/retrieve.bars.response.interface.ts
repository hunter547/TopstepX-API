import { BarInterface } from "../bar.interface";

export interface RetrieveBarsResponseInterface {
  bars: BarInterface[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
