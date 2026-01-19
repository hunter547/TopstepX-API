import type { HttpClient } from "../http-client";
import type {
  PlaceOrderRequest,
  PlaceOrderResponse,
  SearchOrdersRequest,
  SearchOrdersResponse,
  SearchOpenOrdersRequest,
  CancelOrderRequest,
  CancelOrderResponse,
  ModifyOrderRequest,
  ModifyOrderResponse,
  SearchOpenOrdersResponse,
} from "./types";

/**
 * API for managing orders - place, cancel, modify, and search.
 *
 * @example
 * ```typescript
 * // Place a market order
 * const result = await client.orders.place({
 *   accountId: 123,
 *   contractId: 'CON.F.US.ENQ.M25',
 *   type: OrderType.Market,
 *   side: OrderSide.Buy,
 *   size: 1,
 * });
 *
 * // Cancel an order
 * await client.orders.cancel({ accountId: 123, orderId: result.orderId });
 * ```
 *
 * @category REST API
 */
export class OrderApi {
  /** @internal */
  constructor(private readonly http: HttpClient) {}

  /**
   * Search historical orders within a date range.
   * @param request - Search parameters including accountId and optional date range
   * @returns Array of orders matching the search criteria
   */
  async search(request: SearchOrdersRequest): Promise<SearchOrdersResponse> {
    const response = await this.http.post<
      SearchOrdersRequest,
      SearchOrdersResponse
    >("/api/Order/search", request);
    return response;
  }

  /**
   * Get all currently open (working) orders for an account.
   * @param request - Request containing the accountId
   * @returns Array of open orders
   */
  async searchOpen(
    request: SearchOpenOrdersRequest,
  ): Promise<SearchOpenOrdersResponse> {
    const response = await this.http.post<
      SearchOpenOrdersRequest,
      SearchOpenOrdersResponse
    >("/api/Order/searchOpen", request);
    return response;
  }

  /**
   * Place a new order.
   * @param request - Order details including type, side, size, and prices
   * @returns Response containing the new orderId
   *
   * @example
   * ```typescript
   * // Market order
   * await client.orders.place({
   *   accountId: 123,
   *   contractId: 'CON.F.US.ENQ.M25',
   *   type: OrderType.Market,
   *   side: OrderSide.Buy,
   *   size: 1,
   * });
   *
   * // Limit order
   * await client.orders.place({
   *   accountId: 123,
   *   contractId: 'CON.F.US.ENQ.M25',
   *   type: OrderType.Limit,
   *   side: OrderSide.Buy,
   *   size: 1,
   *   limitPrice: 5000.00,
   * });
   * ```
   */
  async place(request: PlaceOrderRequest): Promise<PlaceOrderResponse> {
    return this.http.post<PlaceOrderRequest, PlaceOrderResponse>(
      "/api/Order/place",
      request,
    );
  }

  /**
   * Cancel an existing order.
   * @param request - Request containing accountId and orderId to cancel
   * @returns Response indicating success or failure
   */
  async cancel(request: CancelOrderRequest): Promise<CancelOrderResponse> {
    return this.http.post<CancelOrderRequest, CancelOrderResponse>(
      "/api/Order/cancel",
      request,
    );
  }

  /**
   * Modify an existing order's size or price.
   * @param request - Request containing orderId and fields to modify
   * @returns Response indicating success or failure
   */
  async modify(request: ModifyOrderRequest): Promise<ModifyOrderResponse> {
    return this.http.post<ModifyOrderRequest, ModifyOrderResponse>(
      "/api/Order/modify",
      request,
    );
  }
}
