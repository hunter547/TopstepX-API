import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AuthService } from '../src/auth';
import { AuthenticationError } from '../src/errors';

describe('AuthService', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('login', () => {
    it('should login and store token', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          errorMessage: null,
          token: 'test-token-123',
        }),
      });

      const auth = new AuthService({
        username: 'testuser',
        apiKey: 'testapikey',
        autoRefresh: false,
      });

      await auth.login();
      const token = await auth.getSessionToken();

      expect(token).toBe('test-token-123');
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.topstepx.com/api/Auth/loginKey',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            userName: 'testuser',
            apiKey: 'testapikey',
          }),
        })
      );
    });

    it('should throw AuthenticationError on API failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: false,
          errorCode: 401,
          errorMessage: 'Invalid credentials',
          token: null,
        }),
      });

      const auth = new AuthService({
        username: 'baduser',
        apiKey: 'badkey',
        autoRefresh: false,
      });

      await expect(auth.login()).rejects.toThrow('Invalid credentials');
    });

    it('should throw AuthenticationError on HTTP failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const auth = new AuthService({
        username: 'user',
        apiKey: 'key',
        autoRefresh: false,
      });

      await expect(auth.login()).rejects.toThrow(AuthenticationError);
    });
  });

  describe('validate', () => {
    it('should return true for valid session', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            errorCode: 0,
            token: 'token',
          }),
        })
        .mockResolvedValueOnce({ ok: true });

      const auth = new AuthService({
        username: 'user',
        apiKey: 'key',
        autoRefresh: false,
      });

      await auth.login();
      const isValid = await auth.validate();

      expect(isValid).toBe(true);
    });

    it('should return false when no token exists', async () => {
      const auth = new AuthService({
        username: 'user',
        apiKey: 'key',
        autoRefresh: false,
      });

      const isValid = await auth.validate();

      expect(isValid).toBe(false);
    });
  });

  describe('getSessionToken', () => {
    it('should auto-login when no token exists', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          token: 'auto-token',
        }),
      });

      const auth = new AuthService({
        username: 'user',
        apiKey: 'key',
        autoRefresh: false,
      });

      const token = await auth.getSessionToken();

      expect(token).toBe('auto-token');
    });
  });

  describe('destroy', () => {
    it('should clear token on destroy', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          token: 'token',
        }),
      });

      const auth = new AuthService({
        username: 'user',
        apiKey: 'key',
        autoRefresh: false,
      });

      await auth.login();
      auth.destroy();

      // Should need to login again
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          token: 'new-token',
        }),
      });

      const token = await auth.getSessionToken();
      expect(token).toBe('new-token');
    });
  });

  describe('baseUrl', () => {
    it('should use default baseUrl', () => {
      const auth = new AuthService({
        username: 'user',
        apiKey: 'key',
      });

      expect(auth.baseUrl).toBe('https://api.topstepx.com');
    });

    it('should use custom baseUrl', () => {
      const auth = new AuthService({
        username: 'user',
        apiKey: 'key',
        baseUrl: 'https://custom.api.com',
      });

      expect(auth.baseUrl).toBe('https://custom.api.com');
    });
  });
});
