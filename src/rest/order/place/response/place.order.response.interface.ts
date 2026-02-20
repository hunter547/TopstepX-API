export interface PlaceOrderResponseInterface {
  orderId: number;
  success: boolean;
  errorCode: number;
  errorMessage: string | null;
}
