import { ContractInterface } from "../../contract.interface";

export interface SearchContractsResponseInterface {
  contracts: ContractInterface[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
