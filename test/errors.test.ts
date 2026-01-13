import { describe, it, expect } from 'vitest';
import {
  TopstepXError,
  ApiError,
  AuthenticationError,
  ConnectionError,
} from '../src/errors';

describe('Errors', () => {
  describe('ApiError', () => {
    it('should create error with endpoint', () => {
      const error = new ApiError('Request failed', 500, '/api/Order/place');

      expect(error.message).toBe('Request failed');
      expect(error.code).toBe(500);
      expect(error.endpoint).toBe('/api/Order/place');
      expect(error.name).toBe('ApiError');
      expect(error).toBeInstanceOf(TopstepXError);
      expect(error).toBeInstanceOf(Error);
    });

    it('should serialize to JSON with endpoint', () => {
      const error = new ApiError('Not found', 404, '/api/Account/search');
      const json = error.toJSON();

      expect(json.name).toBe('ApiError');
      expect(json.message).toBe('Not found');
      expect(json.code).toBe(404);
      expect(json.endpoint).toBe('/api/Account/search');
      expect(json.timestamp).toBeDefined();
    });
  });

  describe('AuthenticationError', () => {
    it('should create error with code', () => {
      const error = new AuthenticationError('Invalid credentials', 401);

      expect(error.message).toBe('Invalid credentials');
      expect(error.code).toBe(401);
      expect(error.name).toBe('AuthenticationError');
    });

    it('should work without code', () => {
      const error = new AuthenticationError('Session expired');

      expect(error.message).toBe('Session expired');
      expect(error.code).toBeUndefined();
    });
  });

  describe('ConnectionError', () => {
    it('should create error', () => {
      const error = new ConnectionError('WebSocket disconnected');

      expect(error.message).toBe('WebSocket disconnected');
      expect(error.name).toBe('ConnectionError');
    });
  });
});
