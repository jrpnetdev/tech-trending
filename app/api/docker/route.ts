// ============================================================
// GET /api/docker?timeRange=today|7days
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import type { TimeRange } from '@/lib/types';
import { fetchDockerImages } from '@/lib/api/docker';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const timeRange = (searchParams.get('timeRange') ?? 'today') as TimeRange;

  if (!['today', '7days'].includes(timeRange)) {
    return NextResponse.json({ error: 'Invalid timeRange. Use today or 7days.' }, { status: 400 });
  }

  const result = await fetchDockerImages(timeRange);

  return NextResponse.json({
    data: result.data,
    isDemo: result.isDemo,
    error: result.error,
    source: 'Docker Hub',
    lastUpdated: new Date().toISOString(),
  });
}
