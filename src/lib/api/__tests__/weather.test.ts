import { getWeatherData } from '@/lib/api/weather';
import { AppError } from '@/lib/errors/AppError';

global.fetch = jest.fn();

jest.mock('@/lib/config', () => ({
  CONFIG: {
    OPENWEATHER_API_KEY: 'test-api-key',
    WEATHER_API_BASE: 'https://api.openweathermap.org/data/2.5',
    TIME_API_BASE: 'https://worldtimeapi.org/api/timezone',
  },
}));

describe('getWeatherData', () => {
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
  const mockApiKey = 'test-api-key';
  const mockApiBase = 'https://api.openweathermap.org/data/2.5';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('successful requests', () => {
    it('should fetch weather data for a valid city', async () => {
      const mockWeatherData = {
        name: 'London',
        main: { temp: 15, feels_like: 14 },
        weather: [{ main: 'Cloudy' }],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherData,
      } as Response);

      const result = await getWeatherData('London');

      expect(result).toEqual(mockWeatherData);
      expect(mockFetch).toHaveBeenCalledWith(
        `${mockApiBase}/weather?q=London&appid=${mockApiKey}&units=metric`
      );
    });

    it('should encode city names with special characters', async () => {
      const mockWeatherData = {
        name: 'São Paulo',
        main: { temp: 25 },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherData,
      } as Response);

      await getWeatherData('São Paulo');

      const encodedCity = encodeURIComponent('São Paulo');

      expect(mockFetch).toHaveBeenCalledWith(
        `${mockApiBase}/weather?q=${encodedCity}&appid=${mockApiKey}&units=metric`
      );
    });

    it('should always request metric units', async () => {
      const mockWeatherData = {
        main: { temp: 59 },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherData,
      } as Response);

      const result = await getWeatherData('NewYork');

      expect(result).toEqual(mockWeatherData);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('units=metric')
      );
    });
  });

  describe('error handling - HTTP errors', () => {
    it('should throw NotFound error for 404 response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'city not found' }),
      } as Response);

      try {
        await getWeatherData('InvalidCity');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        if (error instanceof AppError) {
          expect(error.code).toBe('NOT_FOUND');
          expect(error.message).toContain('InvalidCity');
        }
      }
    });

    it('should throw Api error for other HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Internal server error' }),
      } as Response);

      try {
        await getWeatherData('London');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        if (error instanceof AppError) {
          expect(error.code).toBe('API_ERROR');
        }
      }
    });

    it('should use API error message if available', async () => {
      const errorMessage = 'API rate limit exceeded';
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({ message: errorMessage }),
      } as Response);

      try {
        await getWeatherData('London');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        if (error instanceof AppError) {
          expect(error.message).toContain(errorMessage);
        }
      }
    });

    it('should handle JSON parsing errors in error response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as Response);

      try {
        await getWeatherData('London');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        if (error instanceof AppError) {
          expect(error.code).toBe('API_ERROR');
        }
      }
    });
  });

  describe('error handling - Network errors', () => {
    it('should throw Network error on fetch failure', async () => {
      mockFetch.mockRejectedValueOnce(
        new Error('fetch failed: network timeout')
      );

      try {
        await getWeatherData('London');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        if (error instanceof AppError) {
          expect(error.code).toBe('NETWORK_ERROR');
        }
      }
    });

    it('should throw Network error on ECONNRESET', async () => {
      mockFetch.mockRejectedValueOnce(new Error('ECONNRESET'));

      try {
        await getWeatherData('London');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        if (error instanceof AppError) {
          expect(error.code).toBe('NETWORK_ERROR');
        }
      }
    });

    it('should throw Network error on connection refused', async () => {
      mockFetch.mockRejectedValueOnce(
        new Error('fetch failed: connection refused')
      );

      try {
        await getWeatherData('London');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        if (error instanceof AppError) {
          expect(error.code).toBe('NETWORK_ERROR');
        }
      }
    });
  });

  describe('error handling - Unknown errors', () => {
    it('should throw Unknown error for unexpected errors', async () => {
      mockFetch.mockRejectedValueOnce(new TypeError('Unexpected error'));

      await expect(getWeatherData('London')).rejects.toMatchObject({
        code: 'UNKNOWN_ERROR',
      });
    });

    it('should throw Unknown error for non-Error objects', async () => {
      mockFetch.mockRejectedValueOnce('string error');

      await expect(getWeatherData('London')).rejects.toMatchObject({
        code: 'UNKNOWN_ERROR',
      });
    });
  });
});
