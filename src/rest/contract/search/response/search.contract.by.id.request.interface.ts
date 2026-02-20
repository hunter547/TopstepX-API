import { ContractInterface } from "../../contract.interface";

export interface SearchContractByIdResponseInterface {
  contract: ContractInterface | null;
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
