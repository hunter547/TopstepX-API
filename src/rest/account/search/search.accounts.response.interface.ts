import { AccountInterface } from "../account.interface";

export interface SearchAccountsResponseInterface {
  accounts: AccountInterface[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
