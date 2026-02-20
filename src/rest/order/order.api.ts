import type { HttpClient } from "../http-client";
import { PlaceOrderRequestInterface } from "./place/request/place.order.request.interface";
import { PlaceOrderResponseInterface } from "./place/response/place.order.response.interface";
import { SearchOrdersRequestInterface } from "./search/request/search.orders.request.interface";
import { SearchOrdersResponseInterface } from "./search/response/search.orders.response.interface";
import { SearchOpenOrdersRequestInterface } from "./search/open/request/search.open.orders.request.interface";
import { SearchOpenOrdersResponseInterface } from "./search/open/response/search.open.orders.response.interface";
import { CancelOrderRequestInterface } from "./cancel/request/cancel.order.request.interface";
import { CancelOrderResponseInterface } from "./cancel/response/cancel.order.response.interface";
import { ModifyOrderRequestInterface } from "./modify/request/modify.order.request.interface";
import { ModifyOrderResponseInterface } from "./modify/response/modify.order.response.interface";

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
  async search(
    request: SearchOrdersRequestInterface,
  ): Promise<SearchOrdersResponseInterface> {
    const response = await this.http.post<
      SearchOrdersRequestInterface,
      SearchOrdersResponseInterface
    >("/api/Order/search", request);
    return response;
  }

  /**
   * Get all currently open (working) orders for an account.
   * @param request - Request containing the accountId
   * @returns Array of open orders
   */
  async searchOpen(
    request: SearchOpenOrdersRequestInterface,
  ): Promise<SearchOpenOrdersResponseInterface> {
    const response = await this.http.post<
      SearchOpenOrdersRequestInterface,
      SearchOpenOrdersResponseInterface
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
  async place(
    request: PlaceOrderRequestInterface,
  ): Promise<PlaceOrderResponseInterface> {
    return this.http.post<
      PlaceOrderRequestInterface,
      PlaceOrderResponseInterface
    >("/api/Order/place", request);
  }

  /**
   * Cancel an existing order.
   * @param request - Request containing accountId and orderId to cancel
   * @returns Response indicating success or failure
   */
  async cancel(
    request: CancelOrderRequestInterface,
  ): Promise<CancelOrderResponseInterface> {
    return this.http.post<
      CancelOrderRequestInterface,
      CancelOrderResponseInterface
    >("/api/Order/cancel", request);
  }

  /**
   * Modify an existing order's size or price.
   * @param request - Request containing orderId and fields to modify
   * @returns Response indicating success or failure
   */
  async modify(
    request: ModifyOrderRequestInterface,
  ): Promise<ModifyOrderResponseInterface> {
    return this.http.post<
      ModifyOrderRequestInterface,
      ModifyOrderResponseInterface
    >("/api/Order/modify", request);
  }
}
