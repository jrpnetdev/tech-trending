// ============================================================
// GET /api/news?country=UK|US&timeRange=today|7days
// Returns top news headlines via NewsAPI
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import type { Country, TimeRange } from '@/lib/types';
import { fetchNews } from '@/lib/api/news';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = (searchParams.get('country') ?? 'UK').toUpperCase() as Country;
  const timeRange = (searchParams.get('timeRange') ?? 'today') as TimeRange;

  if (!['UK', 'US'].includes(country)) {
    return NextResponse.json({ error: 'Invalid country. Use UK or US.' }, { status: 400 });
  }

  const result = await fetchNews(country, timeRange);

  return NextResponse.json({
    data: result.data,
    isDemo: result.isDemo,
    error: result.error,
    source: 'NewsAPI',
    lastUpdated: new Date().toISOString(),
  });
}
