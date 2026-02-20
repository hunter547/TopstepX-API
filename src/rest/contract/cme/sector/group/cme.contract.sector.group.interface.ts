import { CmeContractInterface } from "../../cme.contract.interface";
import { CmeContractSectorEnum } from "../cme.contract.sector.enum";

export interface CmeContractSectorGroupInterface {
  sector: CmeContractSectorEnum;
  contracts: CmeContractInterface[];
}
