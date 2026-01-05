export const CONFIG = {
  // Allow using local mock API routes when running end-to-end tests.
  WEATHER_API_BASE: process.env.NEXT_PUBLIC_USE_MOCKS === '1' ? '/api/mock' : "https://api.openweathermap.org/data/2.5",
  TIME_API_BASE: process.env.NEXT_PUBLIC_USE_MOCKS === '1' ? '/api/mock' : "https://worldtimeapi.org/api/timezone",
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY!,
  };
  