import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: any) {
  // route: /api/mock/<timezone parts...>
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/mock/', '');
  const timezone = path || 'Etc/UTC';

  // Return a deterministic datetime for tests
  const now = new Date('2026-01-01T12:34:56.000Z').toISOString();

  return NextResponse.json({
    abbreviation: 'UTC',
    datetime: now,
    timezone,
    day_of_week: 4,
    day_of_year: 1,
    dst: false,
    week_number: 53,
  });
}
