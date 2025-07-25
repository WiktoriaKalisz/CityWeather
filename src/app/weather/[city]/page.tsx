interface Params {
    params: { city: string };
  }
  
  const getWeatherData = async (city: string) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Nie udało się pobrać danych pogodowych.");
    return res.json();
  };
  
  const getTimeData = async (lat: number, lon: number) => {
    const timezoneRes = await fetch(`http://worldtimeapi.org/api/timezone`);
    const timezones: string[] = await timezoneRes.json();
  
    // Fallback do strefy czasowej pasującej do miasta
    const matching = timezones.find((zone) =>
      zone.toLowerCase().includes("europe") // uproszczenie, można dopasować lepiej
    );
  
    if (matching) {
      const zoneRes = await fetch(`http://worldtimeapi.org/api/timezone/${matching}`);
      if (zoneRes.ok) return zoneRes.json();
    }
  
    return null;
  };
  
async function Page({params }: Params) {
  
    try {
      const weatherData = getWeatherData(params.city);
      const [weather] = await Promise.all([
        weatherData,
      ]);
      const { main, weather: weatherArr, coord } = weather;
      const { lat, lon } = coord;
  
      const timeData = getTimeData(lat, lon);
      const [time] = await Promise.all([
        timeData,
      ]);
  
      return (
        <div className="p-8">
          <h1 className="text-2xl mb-4">🌤️ Pogoda dla: {params.city}</h1>
  
          <div className="mb-4">
            <p>🌡️ Temperatura: {main.temp}°C</p>
            <p>🤔 Odczuwalna: {main.feels_like}°C</p>
            <p>☁️ Opis: {weatherArr[0].description}</p>
          </div>
  
          {time && (
            <div className="mb-4">
              <p>🕒 Czas lokalny: {time.datetime}</p>
              <p>🗺️ Strefa czasowa: {time.timezone}</p>
            </div>
          )}
  
          <div>
            <p>📍 Szerokość: {lat}</p>
            <p>📍 Długość: {lon}</p>
          </div>
        </div>
      );
    } catch (error) {
      return (
        <div className="p-8">
          <h1 className="text-xl text-red-600">Błąd: Nie udało się pobrać danych</h1>
          <p>Sprawdź poprawność wpisanego miasta: {params.city}</p>
        </div>
      );
    }
  }

  export default Page;