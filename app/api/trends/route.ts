// ============================================================
// GET /api/trends?country=UK|US&timeRange=today|7days
// Aggregates GitHub Trending + Reddit trends in parallel
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import type { Country, TimeRange } from '@/lib/types';
import { fetchGithubTrending } from '@/lib/api/github-trending';
import { fetchRedditTrends } from '@/lib/api/reddit';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = (searchParams.get('country') ?? 'UK').toUpperCase() as Country;
  const timeRange = (searchParams.get('timeRange') ?? 'today') as TimeRange;

  // Validate parameters
  if (!['UK', 'US'].includes(country)) {
    return NextResponse.json({ error: 'Invalid country. Use UK or US.' }, { status: 400 });
  }
  if (!['today', '7days'].includes(timeRange)) {
    return NextResponse.json({ error: 'Invalid timeRange. Use today or 7days.' }, { status: 400 });
  }

  // Fetch both sources in parallel
  const [githubResult, redditResult] = await Promise.allSettled([
    fetchGithubTrending(country, timeRange),
    fetchRedditTrends(country, timeRange),
  ]);

  const github = githubResult.status === 'fulfilled'
    ? githubResult.value
    : { data: [], isDemo: true, error: 'Failed to fetch GitHub Trending' };

  const reddit = redditResult.status === 'fulfilled'
    ? redditResult.value
    : { data: [], isDemo: true, error: 'Failed to fetch Reddit trends' };

  return NextResponse.json({
    google: {
      data: github.data,
      isDemo: github.isDemo,
      error: github.error,
      source: 'GitHub Trending',
      lastUpdated: new Date().toISOString(),
    },
    reddit: {
      data: reddit.data,
      isDemo: reddit.isDemo,
      error: reddit.error,
      source: 'Reddit',
      lastUpdated: new Date().toISOString(),
    },
  });
}
