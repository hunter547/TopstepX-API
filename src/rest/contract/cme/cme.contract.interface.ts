import { CmeContractExchangeEnum } from "./exchange/cme.contract.exchange.enum";
import { CmeContractSectorEnum } from "./sector/cme.contract.sector.enum";
import { CmeContractSymbolEnum } from "./symbol/cme.contract.symbol.enum";

export interface CmeContractInterface {
  symbol: CmeContractSymbolEnum;
  name: string;
  sector: CmeContractSectorEnum;
  exchange: CmeContractExchangeEnum;
  tickSize: number;
  tickValue: number;
  roundTripFees: number;
}
