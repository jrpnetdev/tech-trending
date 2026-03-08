// ============================================================
// GET /api/youtube?country=UK|US
// Returns trending YouTube videos for the specified country
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import type { Country, TimeRange } from '@/lib/types';
import { fetchYouTubeTrending } from '@/lib/api/youtube';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = (searchParams.get('country') ?? 'UK').toUpperCase() as Country;
  const timeRange = (searchParams.get('timeRange') ?? 'today') as TimeRange;

  if (!['UK', 'US'].includes(country)) {
    return NextResponse.json({ error: 'Invalid country. Use UK or US.' }, { status: 400 });
  }

  const result = await fetchYouTubeTrending(country, timeRange);

  return NextResponse.json({
    data: result.data,
    isDemo: result.isDemo,
    error: result.error,
    source: 'YouTube Data API v3',
    lastUpdated: new Date().toISOString(),
  });
}
