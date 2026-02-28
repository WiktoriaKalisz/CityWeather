import { getWeatherData } from "@/lib/api/weather";
import { getSunTimes } from "@/lib/api/sun";
import { removePolishChars } from "@/lib/utils/text";
import { iconInfoMap } from "@/lib/utils/icons";
import { handleError } from "@/lib/errors/handleError";
import Link from "next/link";
import Image from "next/image";

interface Params {
  params: Promise<{ city: string }>;
}

export default async function Page({ params }: Params) {
  const { city } = await params;
  const cleanCity = removePolishChars(decodeURIComponent(city));

  try {
    const weather = await getWeatherData(cleanCity);
    const { main, weather: weatherArr, coord } = weather;
    const { lat, lon } = coord;

    const iconCode = weatherArr[0]?.icon;
    const { icon, bg } = iconInfoMap[iconCode] || iconInfoMap["50d"];

    const sunTimes = await getSunTimes(lat, lon);

    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${bg} tracking-widest`}>
        <div className="text-white max-w-md w-full uppercase mx-auto text-left">
          <h1 className="text-6xl mb-1">{Math.round(main.temp)}°C</h1>
          <p className="text-xl font-bold mb-1">{weatherArr[0]?.description}</p>

          <p className="text-xs text-white/70 flex items-center gap-2">
            <Image src="/icons/temperature.png" alt="Feels like" width={12} height={12}/>
            <span>FEELS: {Math.round(main.feels_like)}°C</span>
          </p>

          <div className="flex justify-center mb-20 mt-10">
            <Image src={icon} alt={`Icon ${iconCode}`} className="drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]" width={200} height={200}/>
          </div>

          <h2 className="text-5xl font-bold mb-3 tracking-[0.4em]">{cleanCity}</h2>
          <hr className="border-white/80 mb-3" />

          {sunTimes && (
            <div className="text-white/90 space-y-2">
              <p className="text-xs text-white/70">Time zone: {sunTimes.tzid}</p>
               <div className="text-xs font-bold w-full mb-10">
                Current UTC time: {new Date(sunTimes.currentTime).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </div>
              <div className="flex justify-between items-center text-xs text-white/70">
                <span>Sunrise: {new Date(sunTimes.sunrise).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
                <span>Sunset: {new Date(sunTimes.sunset).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-white/70">
            <span>Lat: {lat.toFixed(4)}</span>
            <span>Lon: {lon.toFixed(4)}</span>
          </div>
              <div className="text-xs text-white/70">
                Day length: {Math.floor(sunTimes.day_length / 3600)}h {Math.floor((sunTimes.day_length % 3600) / 60)}m
              </div>
            </div>
          )}

          
        </div>
      </div>
    );
  } catch (error) {
    const { message, code } = handleError(error);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-red-300 text-center px-4">
        <div className="text-red-800 text-xl space-y-3 max-w-md">
          <h1 className="font-bold text-2xl">
            Error: Couldn&apos;t fetch the data for city: {cleanCity}
          </h1>
          <p className="text-red-700/80">{message}</p>
          <p className="text-xs text-red-500/60">Code: {code}</p>
          <div className="mt-4">
            <Link href="/" className="inline-block px-4 py-2 rounded-md bg-red-800 text-white text-sm hover:bg-red-900 transition">
              Go back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
