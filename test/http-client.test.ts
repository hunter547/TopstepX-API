import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HttpClient } from '../src/rest';
import { ApiError } from '../src/errors';

describe('HttpClient', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function createClient() {
    return new HttpClient({
      baseUrl: 'https://api.topstepx.com',
      getToken: async () => 'test-token',
    });
  }

  describe('post', () => {
    it('should make POST request with auth header', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          errorMessage: null,
          data: 'test',
        }),
      });

      const client = createClient();
      await client.post('/api/test', { foo: 'bar' });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.topstepx.com/api/test',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          }),
          body: JSON.stringify({ foo: 'bar' }),
        })
      );
    });

    it('should return response on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          errorCode: 0,
          errorMessage: null,
          items: [1, 2, 3],
        }),
      });

      const client = createClient();
      const result = await client.post<unknown, { success: boolean; errorCode: number; errorMessage: null; items: number[] }>(
        '/api/test',
        {}
      );

      expect(result.items).toEqual([1, 2, 3]);
    });

    it('should throw ApiError on HTTP error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const client = createClient();

      await expect(client.post('/api/test', {})).rejects.toThrow('HTTP error');
    });

    it('should throw ApiError on API error response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: false,
          errorCode: 1001,
          errorMessage: 'Insufficient funds',
        }),
      });

      const client = createClient();

      await expect(client.post('/api/test', {})).rejects.toThrow(
        'Insufficient funds'
      );
    });

    it('should include endpoint in ApiError', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: false,
          errorCode: 404,
          errorMessage: 'Not found',
        }),
      });

      const client = createClient();

      try {
        await client.post('/api/Order/place', {});
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).endpoint).toBe('/api/Order/place');
      }
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const client = createClient();

      await expect(client.post('/api/test', {})).rejects.toThrow('Network error');
    });
  });
});
