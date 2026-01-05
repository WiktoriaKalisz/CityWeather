import { AppError } from '@/lib/errors/AppError';

describe('AppError', () => {
  it('should create an instance with a message', () => {
    const error = new AppError('Test error');

    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('AppError');
  });

  it('should support code in options', () => {
    const error = new AppError('Test error', { code: 'TEST_CODE' });
    expect(error.code).toBe('TEST_CODE');
  });

  it('should support status in options', () => {
    const error = new AppError('Test error', { status: 400 });
    expect(error.status).toBe(400);
  });

  it('should support cause in options', () => {
    const cause = new Error('Original error');
    const error = new AppError('Test error', { cause });
    expect(error.cause).toBe(cause);
  });

  describe('static methods', () => {
    it('should create a Network error', () => {
      const error = AppError.Network();

      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Network connection problem');
      expect(error.code).toBe('NETWORK_ERROR');
      expect(error.status).toBeUndefined();
    });

    it('should create a Network error with custom message', () => {
      const error = AppError.Network('Custom network error');

      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Custom network error');
      expect(error.code).toBe('NETWORK_ERROR');
      expect(error.status).toBeUndefined();
    });

    it('should create a NotFound error', () => {
      const error = AppError.NotFound();

      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Requested resource not found');
      expect(error.code).toBe('NOT_FOUND');
      expect(error.status).toBe(404);
    });

    it('should create a NotFound error with custom message', () => {
      const error = AppError.NotFound('City not found');

      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('City not found');
      expect(error.code).toBe('NOT_FOUND');
      expect(error.status).toBe(404);
    });

    it('should create an Api error', () => {
      const error = AppError.Api();

      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Unexpected API response');
      expect(error.code).toBe('API_ERROR');
      expect(error.status).toBeUndefined();
    });

    it('should create an Api error with custom message', () => {
      const error = AppError.Api('API rate limit exceeded');

      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('API rate limit exceeded');
      expect(error.code).toBe('API_ERROR');
      expect(error.status).toBeUndefined();
    });

    it('should create an Unknown error', () => {
      const error = AppError.Unknown();

      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Unknown error occurred');
      expect(error.code).toBe('UNKNOWN_ERROR');
      expect(error.status).toBeUndefined();
    });

    it('should create an Unknown error with custom message', () => {
      const error = AppError.Unknown('Something went wrong');

      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Something went wrong');
      expect(error.code).toBe('UNKNOWN_ERROR');
      expect(error.status).toBeUndefined();
    });
  });
});
