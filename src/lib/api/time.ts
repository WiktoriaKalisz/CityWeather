import { CONFIG } from "../config";
import { AppError } from "../errors/AppError";
import tzLookup from "tz-lookup";

export interface TimeApiResponse {
  abbreviation: string;
  datetime: string;
  timezone: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  week_number: number;
}

export const getTimeData = async (
  lat: number,
  lon: number,
  retries = 3
): Promise<TimeApiResponse> => {
  const { TIME_API_BASE } = CONFIG;

  try {
    const timezone = tzLookup(lat, lon);
    const parts = timezone.split("/");

    const url = `${TIME_API_BASE}/${parts.join("/")}`;

    const res = await fetch(url);
    if (!res.ok) throw AppError.Api(`Failed to fetch time data (${res.status})`);

    const data = await res.json();
    return data;
  } catch (err: unknown) {
    if (retries > 0 && err instanceof Error && /fetch failed|ECONNRESET/.test(err.message)) {
      await new Promise((res) => setTimeout(res, 300));
      return getTimeData(lat, lon, retries - 1);
    }

    if (err instanceof AppError) throw err;
    if (err instanceof Error) throw AppError.Unknown(err.message);

    throw AppError.Unknown("An unknown error occurred while fetching time data");
  }
};
