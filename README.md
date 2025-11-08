# CityWeather

CityWeather is a simple weather application built with **Next.js** and **TypeScript**. It allows users to check current weather conditions and local time for any city in the world using external APIs.

## Features

- Search for real-time weather by city name
- Dynamic background and weather icons based on current conditions
- Displays temperature, short weather description, feels-like value and coordinates
- Retrieves current local time based on city’s location
- Built-in retry mechanism for unstable time API calls

## Technologies Used

- **Next.js 13+ (App Router) with React components**
- **TypeScript for type safety and maintainability**
- **Tailwind CSS for responsive styling**
- **OpenWeatherMap API for fetching real-time weather data like temperature and conditions**
- **WorldTimeAPI for fetching real-time city information like timezone and local time**

## Skills Demonstrated

- Working with external REST APIs
- Developing a full-stack web application using Next.js App Router and dynamic routing
- Building UI with responsive design using Tailwind CSS

## UX Principles Applied

The design of CityWeather incorporates few key UX principles to create an intuitive and user-friendly experience:

- **Aesthetic-Usability Effect**  
Visually pleasing UI with soft gradients and clean typography improves perceived usability.

- **Law of Proximity**  
Related weather data is grouped closely together, making it easier to scan and understand.

- **Mental Model & Jakob’s Law**  
The interface follows user expectations based on other weather apps, minimizing the learning curve.

- **Cognitive Load Reduction**  
Simple layout, limited options, and large icons make it easy to interact with the content.

## API Key

To run this project, you need an API key from [OpenWeatherMap](https://openweathermap.org/api).

1. Create a `.env.local` file in the root directory.
2. Add the following line:

```bash
OPENWEATHER_API_KEY=api_key
```

## Installation & Run

git clone https://github.com/WiktoriaKalisz/CityWeather.git
cd CityWeather
npm install
npm run dev

Then go to http://localhost:3000 in your browser.

> ⚠️ Note: Sometimes data may not load due to temporary server issues on OpenWeatherMap or WorldTimeAPI. If this happens, try refreshing the page or wait a few moments before retrying.

## Skills Demonstrated

- Working with external REST APIs
- Developing full-stack website with Next.js App Router and dynamic routing
- Building UI with responsive design using Tailwind CSS

Preview

![Search Page](images/Screenshot1.png)
![Broken Clouds](images/Screenshot2.png)
![Opis obrazka](images/Screenshot3.png)
![Clear Sky Day](images/Screenshot4.png)
![Error Page](images/Screenshot5.png)
