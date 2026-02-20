import { OrderInterface } from "../../../order.interface";

export interface SearchOpenOrdersResponseInterface {
  orders: OrderInterface[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
