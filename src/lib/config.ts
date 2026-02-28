export const CONFIG = {
  USE_MOCKS: process.env.NEXT_PUBLIC_USE_MOCKS === "1",
  WEATHER_API_BASE: "https://api.openweathermap.org/data/2.5",
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY!,
};
