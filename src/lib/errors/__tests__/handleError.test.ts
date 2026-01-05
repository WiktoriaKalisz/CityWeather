import { handleError } from '@/lib/errors/handleError';
import { AppError } from '@/lib/errors/AppError';

describe('handleError', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  describe('AppError handling', () => {
    it('should handle AppError correctly', () => {
      const appError = AppError.NotFound('City not found');
      const result = handleError(appError);

      expect(result.message).toBe('City not found');
      expect(result.code).toBe('NOT_FOUND');
    });

    it('should use APP_ERROR code when AppError has no code', () => {
      const appError = new AppError('Generic app error');
      const result = handleError(appError);

      expect(result.message).toBe('Generic app error');
      expect(result.code).toBe('APP_ERROR');
    });

    it('should handle Network AppError', () => {
      const networkError = AppError.Network('Connection failed');
      const result = handleError(networkError);

      expect(result.message).toBe('Connection failed');
      expect(result.code).toBe('NETWORK_ERROR');
    });
  });

  describe('Network error detection', () => {
    it('should detect fetch failed errors', () => {
      const error = new Error('fetch failed');
      const result = handleError(error);

      expect(result.code).toBe('NETWORK_ERROR');
      expect(result.message).toContain('Network error');
    });

    it('should detect ECONNRESET errors', () => {
      const error = new Error('ECONNRESET');
      const result = handleError(error);

      expect(result.code).toBe('NETWORK_ERROR');
      expect(result.message).toContain('Network error');
    });

    it('should detect fetch-related network errors', () => {
      const error = new Error('something fetch failed something');
      const result = handleError(error);

      expect(result.code).toBe('NETWORK_ERROR');
    });
  });

  describe('Generic Error handling', () => {
    it('should handle generic Error objects', () => {
      const error = new Error('Something went wrong');
      const result = handleError(error);

      expect(result.message).toBe('Something went wrong');
      expect(result.code).toBe('GENERIC_ERROR');
    });

    it('should handle TypeError', () => {
      const error = new TypeError('Cannot read property');
      const result = handleError(error);

      expect(result.message).toBe('Cannot read property');
      expect(result.code).toBe('GENERIC_ERROR');
    });

    it('should handle RangeError', () => {
      const error = new RangeError('Invalid value');
      const result = handleError(error);

      expect(result.message).toBe('Invalid value');
      expect(result.code).toBe('GENERIC_ERROR');
    });
  });

  describe('Unknown error handling', () => {
    it('should handle non-Error objects', () => {
      const result = handleError('string error');

      expect(result.message).toBe('An unexpected error occurred.');
      expect(result.code).toBe('UNKNOWN');
    });

    it('should handle null', () => {
      const result = handleError(null);

      expect(result.message).toBe('An unexpected error occurred.');
      expect(result.code).toBe('UNKNOWN');
    });

    it('should handle undefined', () => {
      const result = handleError(undefined);

      expect(result.message).toBe('An unexpected error occurred.');
      expect(result.code).toBe('UNKNOWN');
    });

    it('should handle objects', () => {
      const result = handleError({ message: 'custom' });

      expect(result.message).toBe('An unexpected error occurred.');
      expect(result.code).toBe('UNKNOWN');
    });
  });

  describe('Development mode logging', () => {
    it('should log errors in development mode', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      process.env.NODE_ENV = 'development';

      const error = new Error('Development error');
      handleError(error);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Caught error:', error);
      consoleErrorSpy.mockRestore();
    });

    it('should not log errors in production mode', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      process.env.NODE_ENV = 'production';

      const error = new Error('Production error');
      handleError(error);

      expect(consoleErrorSpy).not.toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });
});
