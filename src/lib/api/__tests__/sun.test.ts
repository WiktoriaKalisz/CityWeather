import { getSunTimes } from '@/lib/api/sun';
import { AppError } from '@/lib/errors/AppError';
import { CONFIG } from '@/lib/config';

describe('getSunTimes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('fetches sun times successfully', async () => {
    const apiResponse = {
      status: 'OK',
      results: {
        sunrise: '2026-01-01T07:00:00Z',
        sunset: '2026-01-01T16:00:00Z',
        solar_noon: '2026-01-01T11:30:00Z',
        day_length: 32400,
      },
      tzid: 'Europe/Warsaw',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => apiResponse,
    });

    const result = await getSunTimes(50.06, 19.94);

    expect(result).toMatchObject({
      sunrise: apiResponse.results.sunrise,
      sunset: apiResponse.results.sunset,
      solar_noon: apiResponse.results.solar_noon,
      day_length: 32400,
      tzid: 'Europe/Warsaw',
    });

    expect(result.currentTime).toBeDefined();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://api.sunrise-sunset.org/json?lat=50.06&lng=19.94&formatted=0'
      )
    );
  });

  it('throws AppError.Api on non-ok response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    await expect(getSunTimes(50.06, 19.94)).rejects.toBeInstanceOf(AppError);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('throws AppError.Api when API status !== OK', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        status: 'INVALID_REQUEST',
      }),
    });

    await expect(getSunTimes(50.06, 19.94)).rejects.toBeInstanceOf(AppError);
  });

  it('retries on fetch failure and succeeds', async () => {
    const apiResponse = {
      status: 'OK',
      results: {
        sunrise: 'A',
        sunset: 'B',
        solar_noon: 'C',
        day_length: 100,
      },
    };

    (global.fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('fetch failed'))
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => apiResponse,
      });

    const result = await getSunTimes(50.06, 19.94);

    expect(result.sunrise).toBe('A');
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('throws after retries exhausted', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(
      new Error('fetch failed')
    );

    await expect(getSunTimes(50.06, 19.94, 1)).rejects.toBeInstanceOf(AppError);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('throws AppError.Unknown for non-retry errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(
      new Error('some random error')
    );

    await expect(getSunTimes(50.06, 19.94, 0)).rejects.toBeInstanceOf(AppError);
  });

  it('returns mockedSunTimes when USE_MOCKS is true', async () => {
    CONFIG.USE_MOCKS = true;
  
    const result = await getSunTimes(50, 20);
  
    expect(result).toBeDefined();
    expect(global.fetch).not.toHaveBeenCalled();
  
    CONFIG.USE_MOCKS = false; // cleanup
  });
});