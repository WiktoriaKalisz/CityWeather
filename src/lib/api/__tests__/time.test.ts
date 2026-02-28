import { getTimeData } from '@/lib/api/sun';


describe('getTimeData', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('fetches time data successfully', async () => {
    const mockData = {
      date_time: '2026-01-01T00:00:00Z',
      date: '2026-01-01',
      time: '00:00:00',
      day_of_week: 4,
      dst_active: false,
      timezone: 'Europe/Warsaw',
      utc_offset_seconds: 3600,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    } as Response);

    const result = await getTimeData(50.06, 19.94);

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/current/coordinate?latitude=50.06&longitude=19.94')
    );
  });

  it('throws AppError.Api on non-ok response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    await expect(getTimeData(50.06, 19.94)).rejects.toBeInstanceOf(AppError);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('retries on fetch failure and succeeds', async () => {
    const mockData = { datetime: 'ok' };

    (global.fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('fetch failed'))
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      } as Response);

    const result = await getTimeData(50.06, 19.94);

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('throws error after retries are exhausted', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(
      new Error('fetch failed')
    );

    await expect(getTimeData(50.06, 19.94, 1)).rejects.toBeInstanceOf(AppError);

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('throws AppError.Unknown for non-fetch errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(
      new Error('some random error')
    );

    await expect(getTimeData(50.06, 19.94, 0)).rejects.toBeInstanceOf(AppError);
  });
});
