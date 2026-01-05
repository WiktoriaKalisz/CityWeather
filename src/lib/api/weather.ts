import { CONFIG } from "../config";
import { AppError } from "../errors/AppError";

export const getWeatherData = async (city: string) => {
  const { OPENWEATHER_API_KEY, WEATHER_API_BASE } = CONFIG;
  const url = `${WEATHER_API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) throw AppError.NotFound(`City "${city}" not found`);
      const errorData = await res.json().catch(() => ({}));
      throw AppError.Api(errorData.message || "Failed to fetch weather data");
    }

    return await res.json();
  } catch (err: unknown) {
    if (err instanceof AppError) {
      throw err;
    }

    if (err instanceof Error) {
      if (err.name === "FetchError" || /fetch failed|ECONNRESET/.test(err.message)) {
        throw AppError.Network();
      }
      throw AppError.Unknown(err.message);
    }

    throw AppError.Unknown("An unknown error occurred while fetching weather data");
  }
};