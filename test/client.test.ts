import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TopstepXClient } from '../src/client';

// Mock SignalR
vi.mock('@microsoft/signalr', () => ({
  HubConnectionBuilder: vi.fn(() => ({
    withUrl: vi.fn().mockReturnThis(),
    withAutomaticReconnect: vi.fn().mockReturnThis(),
    build: vi.fn(() => ({
      start: vi.fn().mockResolvedValue(undefined),
      stop: vi.fn().mockResolvedValue(undefined),
      invoke: vi.fn().mockResolvedValue(undefined),
      on: vi.fn(),
      state: 'Connected',
    })),
  })),
  HttpTransportType: { WebSockets: 1 },
  HubConnectionState: { Connected: 'Connected' },
}));

describe('TopstepXClient', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function mockSuccessfulLogin() {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        errorCode: 0,
        token: 'test-token',
      }),
    });
  }

  describe('constructor', () => {
    it('should create client with required config', () => {
      const client = new TopstepXClient({
        username: 'testuser',
        apiKey: 'testapikey',
      });

      expect(client.accounts).toBeDefined();
      expect(client.orders).toBeDefined();
      expect(client.positions).toBeDefined();
      expect(client.trades).toBeDefined();
      expect(client.contracts).toBeDefined();
      expect(client.history).toBeDefined();
      expect(client.marketHub).toBeDefined();
      expect(client.userHub).toBeDefined();
    });
  });

  describe('connect', () => {
    it('should authenticate and establish connections', async () => {
      mockSuccessfulLogin();

      const client = new TopstepXClient({
        username: 'testuser',
        apiKey: 'testapikey',
      });

      const connectedHandler = vi.fn();
      client.on('connected', connectedHandler);

      await client.connect();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.topstepx.com/api/Auth/loginKey',
        expect.any(Object)
      );
      expect(connectedHandler).toHaveBeenCalled();
    });
  });

  describe('disconnect', () => {
    it('should emit disconnected event', async () => {
      mockSuccessfulLogin();

      const client = new TopstepXClient({
        username: 'testuser',
        apiKey: 'testapikey',
      });

      await client.connect();

      const disconnectedHandler = vi.fn();
      client.on('disconnected', disconnectedHandler);

      await client.disconnect();

      expect(disconnectedHandler).toHaveBeenCalled();
    });
  });

  describe('getToken', () => {
    it('should return current session token', async () => {
      mockSuccessfulLogin();

      const client = new TopstepXClient({
        username: 'testuser',
        apiKey: 'testapikey',
      });

      await client.connect();
      const token = await client.getToken();

      expect(token).toBe('test-token');
    });
  });

  describe('REST API access', () => {
    it('should provide access to accounts API', async () => {
      mockSuccessfulLogin();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          accounts: [{ id: 1, name: 'Test Account' }],
        }),
      });

      const client = new TopstepXClient({
        username: 'testuser',
        apiKey: 'testapikey',
      });

      await client.connect();
      const accounts = await client.accounts.search({ onlyActiveAccounts: true });

      expect(accounts).toHaveLength(1);
      expect(accounts[0].name).toBe('Test Account');
    });
  });
});
