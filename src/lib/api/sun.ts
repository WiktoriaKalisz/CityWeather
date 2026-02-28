import { AppError } from "../errors/AppError";
import { mockedSunTimes } from "../../../__mocks__/weather";
import { CONFIG } from "../config";

export interface SunTimesResponse {
  sunrise: string;
  sunset: string;
  solar_noon: string;
  day_length: number; // seconds
  tzid: string;
  currentTime: string; // ISO now
}

export const getSunTimes = async (lat: number, lon: number, retries = 3): Promise<SunTimesResponse> => {
  if (CONFIG.USE_MOCKS) {
    return mockedSunTimes;
  }
  try {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
    const res = await fetch(url);
    if (!res.ok) throw AppError.Api(`Failed to fetch sun times (${res.status})`);
    
    const data = await res.json();
    if (data.status !== "OK") throw AppError.Api(`Sunrise-Sunset API error: ${data.status}`);

    return {
      sunrise: data.results.sunrise,
      sunset: data.results.sunset,
      solar_noon: data.results.solar_noon,
      day_length: Number(data.results.day_length),
      tzid: data.tzid || "UTC",
      currentTime: new Date().toISOString(),
    };
  } catch (err: unknown) {
    if (retries > 0 && err instanceof Error && /fetch failed|ECONNRESET/.test(err.message)) {
      await new Promise(res => setTimeout(res, 300));
      return getSunTimes(lat, lon, retries - 1);
    }

    if (err instanceof AppError) throw err;
    if (err instanceof Error) throw AppError.Unknown(err.message);
    throw AppError.Unknown("Unknown error while fetching sun times");
  }
};
