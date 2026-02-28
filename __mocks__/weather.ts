export const mockedWeatherData = {
  main: {
    temp: 12,        // temperatura
    feels_like: 10,  // odczuwalna
    pressure: 1012,
    humidity: 75
  },
  weather: [
    {
      id: 500,
      main: "Rain",
      description: "light rain",
      icon: "10d"
    }
  ],
  wind: {
    speed: 5.5,
    deg: 180
  },
  clouds: {
    all: 90
  },
  coord: {
    lat: 50.0647,
    lon: 19.9450
  },
  name: "Krakow",
  sys: {
    country: "PL"
  }
};

export const mockedSunTimes = {
  tzid: "UTC",
  sunrise: "2026-02-08T06:30:00Z",
  sunset: "2026-02-08T16:45:00Z",
  solar_noon: "2026-02-08T11:37:30Z",
  currentTime: "2026-02-08T12:00:00Z",
  day_length: 36900,
  civil_twilight_begin: "2026-02-08T06:00:00Z",
  civil_twilight_end: "2026-02-08T17:15:00Z",
  nautical_twilight_begin: "2026-02-08T05:30:00Z",
  nautical_twilight_end: "2026-02-08T17:45:00Z",
  astronomical_twilight_begin: "2026-02-08T05:00:00Z",
  astronomical_twilight_end: "2026-02-08T18:15:00Z"
};
