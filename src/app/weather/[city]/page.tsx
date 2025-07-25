interface Params {
    params: Promise<{ city: string }>;
  }
  
  const getWeatherData = async (city: string) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    console.log("API key:", apiKey);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac2135bc7f81360a90120edeaf0b7a5b&units=metric`;
    const res = await fetch(url);
    console.log("RES: ", res);
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
  
async function Page(props: Params) {
  const params = await props.params;

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
        <div className="max-w-md mx-auto p-8 bg-gradient-to-r from-blue-200 via-white to-blue-100 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">🌤️ Pogoda dla: {params.city}</h1>
      
          <div className="mb-6 bg-white p-4 rounded-lg shadow-inner">
            <p className="text-lg font-semibold mb-2">🌡️ Temperatura: <span className="text-red-600">{main.temp}°C</span></p>
            <p className="text-md mb-2">🤔 Odczuwalna: <span className="text-red-500">{main.feels_like}°C</span></p>
            <p className="italic text-gray-700">☁️ Opis: {weatherArr[0].description}</p>
          </div>
      
          {time && (
            <div className="mb-6 bg-white p-4 rounded-lg shadow-inner">
              <p className="text-md mb-1">🕒 Czas lokalny: <span className="font-mono">{new Date(time.datetime).toLocaleString()}</span></p>
              <p className="text-sm text-gray-600">🗺️ Strefa czasowa: {time.timezone}</p>
            </div>
          )}
      
          <div className="bg-white p-4 rounded-lg shadow-inner">
            <p className="text-sm text-gray-700">📍 Szerokość: {lat.toFixed(4)}</p>
            <p className="text-sm text-gray-700">📍 Długość: {lon.toFixed(4)}</p>
          </div>
        </div>
      );
  } catch (error) {
    //console.log("Error: ", error);
    return (
      <div className="p-8">
        <h1 className="text-xl text-red-600">Błąd: Nie udało się pobrać danych</h1>
        <p>Sprawdź poprawność wpisanego miasta: {params.city}</p>
      </div>
    );
  }
}

  export default Page;