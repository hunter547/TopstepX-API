import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { OrderApi, HttpClient } from "../src/rest";
import { OrderType, OrderSide, OrderStatus } from "../src/types";

describe("OrderApi", () => {
  const mockFetch = vi.fn();
  let orderApi: OrderApi;

  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
    mockFetch.mockReset();

    const httpClient = new HttpClient({
      baseUrl: "https://api.topstepx.com",
      getToken: async () => "test-token",
    });
    orderApi = new OrderApi(httpClient);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("place", () => {
    it("should place a market order", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          errorMessage: null,
          orderId: 12345,
        }),
      });

      const result = await orderApi.place({
        accountId: 1,
        contractId: "CON.F.US.ENQ.M25",
        type: OrderType.Market,
        side: OrderSide.Buy,
        size: 1,
      });

      expect(result.orderId).toBe(12345);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.topstepx.com/api/Order/place",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            accountId: 1,
            contractId: "CON.F.US.ENQ.M25",
            type: OrderType.Market,
            side: OrderSide.Buy,
            size: 1,
          }),
        }),
      );
    });

    it("should place a limit order with price", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          errorMessage: null,
          orderId: 12346,
        }),
      });

      const result = await orderApi.place({
        accountId: 1,
        contractId: "CON.F.US.ENQ.M25",
        type: OrderType.Limit,
        side: OrderSide.Sell,
        size: 2,
        limitPrice: 5000.5,
      });

      expect(result.orderId).toBe(12346);
    });
  });

  describe("cancel", () => {
    it("should cancel an order", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          errorMessage: null,
        }),
      });

      const result = await orderApi.cancel({
        accountId: 1,
        orderId: 12345,
      });

      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.topstepx.com/api/Order/cancel",
        expect.any(Object),
      );
    });
  });

  describe("modify", () => {
    it("should modify an order", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          errorMessage: null,
        }),
      });

      const result = await orderApi.modify({
        accountId: 1,
        orderId: 12345,
        limitPrice: 5100.0,
      });

      expect(result.success).toBe(true);
    });
  });

  describe("search", () => {
    it("should search orders with date range", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          errorMessage: null,
          orders: [
            {
              id: 1,
              accountId: 1,
              contractId: "CON.F.US.ENQ.M25",
              status: OrderStatus.Filled,
              type: OrderType.Market,
              side: OrderSide.Buy,
              size: 1,
            },
          ],
        }),
      });

      const response = await orderApi.search({
        accountId: 1,
        startTimestamp: "2025-01-01T00:00:00Z",
        endTimestamp: "2025-01-31T23:59:59Z",
      });

      expect(response.orders).toHaveLength(1);
      expect(response.orders[0].id).toBe(1);
    });
  });

  describe("searchOpen", () => {
    it("should return open orders", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          errorMessage: null,
          orders: [
            {
              id: 2,
              accountId: 1,
              contractId: "CON.F.US.ENQ.M25",
              status: OrderStatus.Working,
              type: OrderType.Limit,
              side: OrderSide.Buy,
              size: 1,
              limitPrice: 4900.0,
            },
          ],
        }),
      });

      const response = await orderApi.searchOpen({ accountId: 1 });

      expect(response.orders).toHaveLength(1);
      expect(response.orders[0].status).toBe(OrderStatus.Working);
    });
  });
});
