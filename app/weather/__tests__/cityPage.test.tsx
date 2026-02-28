import Page from '../[city]/page';
import { getWeatherData } from '@/lib/api/weather';
import { getSunTimes } from '@/lib/api/sun';
import { render } from '@testing-library/react';
import React from 'react';

jest.mock('@/lib/api/weather', () => ({
  getWeatherData: jest.fn(),
}));

jest.mock('@/lib/api/sun', () => ({
  getSunTimes: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} alt={props.alt ?? ''} />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe('City Page (server component)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders weather data and sun times for a city', async () => {
    (getWeatherData as jest.Mock).mockResolvedValueOnce({
      main: { temp: 12.3, feels_like: 11.7 },
      weather: [{ description: 'light rain', icon: '10d' }],
      coord: { lat: 50.06143, lon: 19.93658 },
    });

    (getSunTimes as jest.Mock).mockResolvedValueOnce({
      sunrise: '2026-01-01T07:00:00.000Z',
      sunset: '2026-01-01T16:00:00.000Z',
      solar_noon: '2026-01-01T11:30:00.000Z',
      day_length: 32400,
      tzid: 'Europe/Warsaw',
      currentTime: '2026-01-01T12:34:56.000Z',
    });

    const element = await Page({
      params: { city: encodeURIComponent('Łódź') },
    });

    const { container } = render(element);

    expect(container).toHaveTextContent('12°C');
    expect(container).toHaveTextContent(/light rain/i);
    expect(container).toHaveTextContent('Lodz');
    expect(container).toHaveTextContent(/Europe\/Warsaw/);
  });
});