interface Params {
    params: Promise<{ city: string }>;
  }

  const iconInfoMap: Record<string, { icon: string; bg: string }> = {
    "01d": {
      icon: "/icons/clear-day.png",
      bg: "bg-gradient-to-b from-sky-300  to-orange-300",
    },
    "01n": {
      icon: "/icons/clear-night.png",
      bg: "bg-gradient-to-b from-indigo-200 via-white-200 to-purple-200",
    },
    "02d": {
      icon: "/icons/few-clouds-day.png",
      bg: "bg-gradient-to-b from-blue-300 via-yellow-100 to-blue-300",
    },
    "02n": {
      icon: "/icons/few-clouds-night.png",
      bg: "bg-gradient-to-b from-gray-600 to-purple-200",
    },
    "03d": {
      icon: "/icons/scattered-clouds.png",
      bg: "bg-gradient-to-b from-orange-300 to-gray-500",
    },
    "03n": {
      icon: "/icons/scattered-clouds.png",
      bg: "bg-gradient-to-b from-gray-400 via-gray-500 to-gray-700",
    },
    "04d": {
      icon: "/icons/broken-clouds.png",
      bg: "bg-gradient-to-b from-gray-400 via-gray-300 to-orange-200",
    },
    "04n": {
      icon: "/icons/broken-clouds.png",
      bg: "bg-gradient-to-b from-gray-400 via-gray-500 to-gray-700",
    },
    "09d": {
      icon: "/icons/shower-rain.png",
      bg: "bg-gradient-to-b from-yellow-200 via-blue-300 to-gray-700",
    },
    "09n": {
      icon: "/icons/shower-rain.png",
      bg: "bg-gradient-to-b from-violet-200 via-blue-400 to-gray-800",
    },
    "10d": {
      icon: "/icons/rain-day.png",
      bg: "bg-gradient-to-b from-yellow-200 via-blue-300 to-gray-700",
    },
    "10n": {
      icon: "/icons/rain-night.png",
      bg: "bg-gradient-to-b from-violet-200 via-blue-400 to-gray-800",
    },
    "11d": {
      icon: "/icons/thunderstorm.png",
      bg: "bg-gradient-to-b from-orange-900 via-gray-700 to-gray-800",
    },
    "11n": {
      icon: "/icons/thunderstorm.png",
      bg: "bg-gradient-to-b from-violet-800 via-gray-700 to-gray-800",
    },
    "13d": {
      icon: "/icons/snow.png",
      bg: "bg-gradient-to-b from-gray-200 to-gray-400",
    },
    "13n": {
      icon: "/icons/snow.png",
      bg: "bg-gradient-to-b from-gray-600 to-gray-400",
    },
    "50d": {
      icon: "/icons/mist.png",
      bg: "bg-gradient-to-b from-gray-300 to-gray-500",
    },
    "50n": {
      icon: "/icons/mist.png",
      bg: "bg-gradient-to-b from-gray-300 to-gray-500",
    },
  };

  const getWeatherData = async (city: string) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "unknown error");
      }
    return res.json();
  };

  /** Fetches time data with retry logic and delay due to occasional API fetch failures. */
  const getTimeData = async (lat: number, lon: number, retries = 3): Promise<any> => {
    try {
      const timezoneRes = await fetch(`https://worldtimeapi.org/api/timezone`);
      if (!timezoneRes.ok) {
        throw new Error(`Failed to fetch timezones: ${timezoneRes.status}`);
      }
  
      const timezones: string[] = await timezoneRes.json();
  
      const matching = timezones.find(zone => zone.includes("Europe/Warsaw"));
      if (!matching) throw new Error("No matching timezone found");
  
      const timeRes = await fetch(`https://worldtimeapi.org/api/timezone/${matching}`);
      if (!timeRes.ok) {
        throw new Error(`Failed to fetch time data: ${timeRes.status}`);
      }
  
      return await timeRes.json();
  
    } catch (err: unknown) {
      if (
        retries > 0 &&
        err instanceof Error &&
        (err.message.includes("ECONNRESET") || err.message.includes("fetch failed"))
      ) {
        console.warn(`Retrying getTimeData due to network error, attempts left: ${retries}`);
        await new Promise(res => setTimeout(res, 300)); // delay before retry
        return getTimeData(lat, lon, retries - 1);
      }
  
      if (err instanceof Error) {
        console.error("Error in getTimeData:", err.message);
      } else {
        console.error("Unknown error in getTimeData:", err);
      }
  
      throw err;
    }
  };
  
  export default async function Page(props: Params) {
    const params = await props.params;
  
    try {
      const weather = await getWeatherData(params.city);
      const { main, weather: weatherArr, coord } = weather;
      const iconCode = weatherArr[0]?.icon;
  
      const iconInfo = iconInfoMap[iconCode] || {
        icon: "/icons/mist.png",
        bg: "bg-gradient-to-b from-blue-300 via-purple-200 to-blue-200",
      };
      const iconPath = iconInfo.icon;
      const bgColorClass = iconInfo.bg;
      const { lat, lon } = coord;
  
      const timeDataPromise = getTimeData(lat, lon);
      const [time] = await Promise.all([timeDataPromise]);
  
      return (
        <div className={`min-h-screen flex items-center justify-center px-4 ${bgColorClass} tracking-widest`}>
          <div className="text-white max-w-md w-full uppercase mx-auto text-left">
            <h1 className="text-6xl mb-1">{Math.round(main.temp)}°C</h1>
            <p className="text-xl font-bold mb-1">{weatherArr[0]?.description}</p>
            <p className="text-xs text-white/80 flex items-center gap-2">
              <img src="/icons/temperature.png" alt="Feels like" className="w-4 h-4" />
              <span>FEELS: {Math.round(main.feels_like)}°C</span>
            </p>
            <div className="flex justify-center mb-30 mt-10">
              <img src={iconPath} alt={`Icon ${iconCode}`} className="w-50 h-50 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]" />
            </div>
            <h2 className="text-4xl mb-3 tracking-[0.4em]">{params.city}</h2>
            <hr className="border-white/80 mb-3" />
            {time && (
              <div className="text-white/90 space-y-2">
                <p className="text-sm text-white/70">{time.timezone}</p>
                <div className="flex justify-between items-center text-2xl font-medium w-full">
                  <span>
                    {new Date(time.datetime).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="font-mono text-md">
                    {new Date(time.datetime).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            )}
            <div className="flex gap-4 text-sm text-white/70 mt-2">
              <span>Lat: {lat.toFixed(4)}</span>
              <span>Lon: {lon.toFixed(4)}</span>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error in Page component:", error);
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-red-300 text-center px-4">
          <div className="text-red-800 text-xl">
            <h1 className="font-bold mb-2">Error: Couldn't fetch the data for city: {params.city}</h1>
            <p className="capitalize">{error instanceof Error ? error.message : String(error)}</p>
          </div>
        </div>
      );
    }
  }
