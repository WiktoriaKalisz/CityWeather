import Page from '../[city]/page';
import { getWeatherData } from '@/lib/api/weather';
import { getTimeData } from '@/lib/api/time';
import { render } from '@testing-library/react';
import React from 'react';

jest.mock('@/lib/api/weather', () => ({
  getWeatherData: jest.fn(),
}));

jest.mock('@/lib/api/time', () => ({
  getTimeData: jest.fn(),
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

  it('renders weather data and time for a city', async () => {
    (getWeatherData as jest.Mock).mockResolvedValueOnce({
      main: { temp: 12.3, feels_like: 11.7 },
      weather: [{ description: 'light rain', icon: '10d' }],
      coord: { lat: 50.06143, lon: 19.93658 },
    });

    (getTimeData as jest.Mock).mockResolvedValueOnce({
      abbreviation: 'CET',
      datetime: '2026-01-01T12:34:56.000Z',
      timezone: 'Europe/Warsaw',
      day_of_week: 4,
      day_of_year: 1,
      dst: false,
      week_number: 1,
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