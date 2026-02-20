import { TradeInterface } from "../../../../trade";
import { CmeContractSectorEnum } from "../cme.contract.sector.enum";

export interface CmeTradeSectorGroupInterface {
  sector: CmeContractSectorEnum;
  trades: TradeInterface[];
}
