import { OrderInterface } from "../../order.interface";

export interface SearchOrdersResponseInterface {
  orders: OrderInterface[];
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
