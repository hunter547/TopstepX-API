import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RealtimeMarketEventHub } from '../src/realtime';
import type { ConnectionManager } from '../src/realtime';
import type { HubConnection } from '@microsoft/signalr';

describe('MarketHub', () => {
  function createMockConnectionManager() {
    const mockInvoke = vi.fn().mockResolvedValue(undefined);
    const eventHandlers = new Map<string, (...args: unknown[]) => void>();

    const mockConnection = {
      invoke: mockInvoke,
      on: vi.fn((event: string, handler: (...args: unknown[]) => void) => {
        eventHandlers.set(event, handler);
      }),
    } as unknown as HubConnection;

    const connectionManager = {
      marketConnection: mockConnection,
      onMarketConnection: vi.fn((callback: (conn: HubConnection) => void) => {
        callback(mockConnection);
      }),
    } as unknown as ConnectionManager;

    return {
      connectionManager,
      mockConnection,
      mockInvoke,
      eventHandlers,
      triggerEvent: (event: string, ...args: unknown[]) => {
        const handler = eventHandlers.get(event);
        if (handler) handler(...args);
      },
    };
  }

  describe('subscribe', () => {
    it('should subscribe to all market data for a contract', async () => {
      const { connectionManager, mockInvoke } = createMockConnectionManager();
      const marketHub = new RealtimeMarketEventHub(connectionManager);

      await marketHub.subscribe('CON.F.US.ENQ.M25');

      expect(mockInvoke).toHaveBeenCalledWith(
        'SubscribeContractQuotes',
        'CON.F.US.ENQ.M25'
      );
      expect(mockInvoke).toHaveBeenCalledWith(
        'SubscribeContractTrades',
        'CON.F.US.ENQ.M25'
      );
      expect(mockInvoke).toHaveBeenCalledWith(
        'SubscribeContractMarketDepth',
        'CON.F.US.ENQ.M25'
      );
    });

    it('should not re-subscribe to already subscribed contract', async () => {
      const { connectionManager, mockInvoke } = createMockConnectionManager();
      const marketHub = new RealtimeMarketEventHub(connectionManager);

      await marketHub.subscribeQuotes('CON.F.US.ENQ.M25');
      await marketHub.subscribeQuotes('CON.F.US.ENQ.M25');

      expect(mockInvoke).toHaveBeenCalledTimes(1);
    });
  });

  describe('unsubscribe', () => {
    it('should unsubscribe from all market data', async () => {
      const { connectionManager, mockInvoke } = createMockConnectionManager();
      const marketHub = new RealtimeMarketEventHub(connectionManager);

      await marketHub.subscribe('CON.F.US.ENQ.M25');
      mockInvoke.mockClear();
      await marketHub.unsubscribe('CON.F.US.ENQ.M25');

      expect(mockInvoke).toHaveBeenCalledWith(
        'UnsubscribeContractQuotes',
        'CON.F.US.ENQ.M25'
      );
      expect(mockInvoke).toHaveBeenCalledWith(
        'UnsubscribeContractTrades',
        'CON.F.US.ENQ.M25'
      );
      expect(mockInvoke).toHaveBeenCalledWith(
        'UnsubscribeContractMarketDepth',
        'CON.F.US.ENQ.M25'
      );
    });

    it('should not unsubscribe from non-subscribed contract', async () => {
      const { connectionManager, mockInvoke } = createMockConnectionManager();
      const marketHub = new RealtimeMarketEventHub(connectionManager);

      await marketHub.unsubscribeQuotes('CON.F.US.ENQ.M25');

      expect(mockInvoke).not.toHaveBeenCalled();
    });
  });

  describe('events', () => {
    it('should emit quote events', async () => {
      const { connectionManager, triggerEvent } = createMockConnectionManager();
      const marketHub = new RealtimeMarketEventHub(connectionManager);
      const handler = vi.fn();

      marketHub.on('quote', handler);

      const quoteData = [{ lastPrice: 5000, bestBid: 4999, bestAsk: 5001 }];
      triggerEvent('GatewayQuote', 'CON.F.US.ENQ.M25', quoteData);

      expect(handler).toHaveBeenCalledWith({
        contractId: 'CON.F.US.ENQ.M25',
        data: quoteData,
      });
    });

    it('should emit trade events', async () => {
      const { connectionManager, triggerEvent } = createMockConnectionManager();
      const marketHub = new RealtimeMarketEventHub(connectionManager);
      const handler = vi.fn();

      marketHub.on('trade', handler);

      const tradeData = [{ price: 5000, volume: 10 }];
      triggerEvent('GatewayTrade', 'CON.F.US.ENQ.M25', tradeData);

      expect(handler).toHaveBeenCalledWith({
        contractId: 'CON.F.US.ENQ.M25',
        data: tradeData,
      });
    });

    it('should emit depth events', async () => {
      const { connectionManager, triggerEvent } = createMockConnectionManager();
      const marketHub = new RealtimeMarketEventHub(connectionManager);
      const handler = vi.fn();

      marketHub.on('depth', handler);

      const depthData = [{ price: 5000, volume: 100 }];
      triggerEvent('GatewayDepth', 'CON.F.US.ENQ.M25', depthData);

      expect(handler).toHaveBeenCalledWith({
        contractId: 'CON.F.US.ENQ.M25',
        data: depthData,
      });
    });
  });

  describe('selective subscriptions', () => {
    it('should subscribe to quotes only', async () => {
      const { connectionManager, mockInvoke } = createMockConnectionManager();
      const marketHub = new RealtimeMarketEventHub(connectionManager);

      await marketHub.subscribeQuotes('CON.F.US.ENQ.M25');

      expect(mockInvoke).toHaveBeenCalledTimes(1);
      expect(mockInvoke).toHaveBeenCalledWith(
        'SubscribeContractQuotes',
        'CON.F.US.ENQ.M25'
      );
    });

    it('should subscribe to trades only', async () => {
      const { connectionManager, mockInvoke } = createMockConnectionManager();
      const marketHub = new RealtimeMarketEventHub(connectionManager);

      await marketHub.subscribeTrades('CON.F.US.ENQ.M25');

      expect(mockInvoke).toHaveBeenCalledTimes(1);
      expect(mockInvoke).toHaveBeenCalledWith(
        'SubscribeContractTrades',
        'CON.F.US.ENQ.M25'
      );
    });

    it('should subscribe to depth only', async () => {
      const { connectionManager, mockInvoke } = createMockConnectionManager();
      const marketHub = new RealtimeMarketEventHub(connectionManager);

      await marketHub.subscribeDepth('CON.F.US.ENQ.M25');

      expect(mockInvoke).toHaveBeenCalledTimes(1);
      expect(mockInvoke).toHaveBeenCalledWith(
        'SubscribeContractMarketDepth',
        'CON.F.US.ENQ.M25'
      );
    });
  });
});
