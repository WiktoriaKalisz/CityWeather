import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const city = q.toLowerCase();

  // Provide deterministic mock responses for known cities
  if (city.includes('krakow') || city.includes('kraków')) {
    return NextResponse.json({
      name: 'Krakow',
      main: { temp: 12.34, feels_like: 11.7 },
      weather: [{ description: 'light rain', icon: '10d' }],
      coord: { lat: 50.06143, lon: 19.93658 },
    });
  }

  if (city.includes('london')) {
    return NextResponse.json({
      name: 'London',
      main: { temp: 8.5, feels_like: 7.2 },
      weather: [{ description: 'cloudy', icon: '03d' }],
      coord: { lat: 51.5074, lon: -0.1278 },
    });
  }

  // default mock
  if (city) {
    return NextResponse.json({
      name: q,
      main: { temp: 20, feels_like: 19 },
      weather: [{ description: 'clear sky', icon: '01d' }],
      coord: { lat: 0, lon: 0 },
    });
  }

  return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
}
