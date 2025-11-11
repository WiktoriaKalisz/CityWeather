// Weather icon mapping for OpenWeather icon codes 
export const iconInfoMap: Record<string, { icon: string; bg: string }> = {
    "01d": { icon: "/icons/clear-day.png", bg: "bg-gradient-to-b from-sky-300 to-orange-300" },
    "01n": { icon: "/icons/clear-night.png", bg: "bg-gradient-to-b from-indigo-200 via-white-200 to-purple-200" },
    "02d": { icon: "/icons/few-clouds-day.png", bg: "bg-gradient-to-b from-blue-300 via-yellow-100 to-blue-300" },
    "02n": { icon: "/icons/few-clouds-night.png", bg: "bg-gradient-to-b from-gray-600 to-purple-200" },
    "03d": { icon: "/icons/scattered-clouds.png", bg: "bg-gradient-to-b from-orange-300 to-gray-500" },
    "03n": { icon: "/icons/scattered-clouds.png", bg: "bg-gradient-to-b from-gray-400 via-gray-500 to-gray-700" },
    "04d": { icon: "/icons/broken-clouds.png", bg: "bg-gradient-to-b from-gray-400 via-gray-300 to-orange-200" },
    "04n": { icon: "/icons/broken-clouds.png", bg: "bg-gradient-to-b from-gray-400 via-gray-500 to-gray-700" },
    "09d": { icon: "/icons/shower-rain.png", bg: "bg-gradient-to-b from-yellow-200 via-blue-300 to-gray-700" },
    "09n": { icon: "/icons/shower-rain.png", bg: "bg-gradient-to-b from-violet-200 via-blue-400 to-gray-800" },
    "10d": { icon: "/icons/rain-day.png", bg: "bg-gradient-to-b from-yellow-200 via-blue-300 to-gray-700" },
    "10n": { icon: "/icons/rain-night.png", bg: "bg-gradient-to-b from-violet-200 via-blue-400 to-gray-800" },
    "11d": { icon: "/icons/thunderstorm.png", bg: "bg-gradient-to-b from-orange-900 via-gray-700 to-gray-800" },
    "11n": { icon: "/icons/thunderstorm.png", bg: "bg-gradient-to-b from-violet-800 via-gray-700 to-gray-800" },
    "13d": { icon: "/icons/snow.png", bg: "bg-gradient-to-b from-gray-200 to-gray-400" },
    "13n": { icon: "/icons/snow.png", bg: "bg-gradient-to-b from-gray-600 to-gray-400" },
    "50d": { icon: "/icons/mist.png", bg: "bg-gradient-to-b from-gray-300 to-gray-500" },
    "50n": { icon: "/icons/mist.png", bg: "bg-gradient-to-b from-gray-300 to-gray-500" },
  };
  