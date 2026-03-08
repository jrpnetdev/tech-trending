// ============================================================
// YouTube Data API v3 Client
// Requires YOUTUBE_API_KEY environment variable
// Free tier: 10,000 units/day — console.cloud.google.com
// ============================================================

import type { YouTubeVideo, Country, TimeRange } from '../types';
import { MOCK_YOUTUBE_UK, MOCK_YOUTUBE_US } from '../mock-data';
import { getCountryGeoCode, buildYouTubeUrl, getYouTubeCategoryName } from '../utils';

interface YouTubeApiItem {
  id?: string;
  snippet?: {
    title?: string;
    channelTitle?: string;
    publishedAt?: string;
    categoryId?: string;
    thumbnails?: {
      medium?: { url?: string };
      high?: { url?: string };
      default?: { url?: string };
    };
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
}

interface YouTubeApiResponse {
  items?: YouTubeApiItem[];
  error?: { message?: string; code?: number };
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

function mapItemToVideo(item: YouTubeApiItem): YouTubeVideo | null {
  const id = item.id;
  const snippet = item.snippet;
  if (!id || !snippet) return null;

  const thumbnail =
    snippet.thumbnails?.medium?.url ??
    snippet.thumbnails?.high?.url ??
    snippet.thumbnails?.default?.url;

  return {
    id,
    title: snippet.title ?? 'Untitled',
    channelTitle: snippet.channelTitle ?? 'Unknown Channel',
    thumbnailUrl: thumbnail,
    viewCount: item.statistics?.viewCount,
    likeCount: item.statistics?.likeCount,
    url: buildYouTubeUrl(id),
    publishedAt: snippet.publishedAt ?? new Date().toISOString(),
    categoryId: snippet.categoryId,
    categoryName: getYouTubeCategoryName(snippet.categoryId),
  };
}

async function fetchTodayTrending(regionCode: string): Promise<YouTubeApiResponse> {
  const url =
    `${BASE_URL}/videos` +
    `?part=snippet,statistics` +
    `&chart=mostPopular` +
    `&regionCode=${regionCode}` +
    `&videoCategoryId=28` +
    `&maxResults=10` +
    `&key=${YOUTUBE_API_KEY}`;

  const response = await fetch(url, { next: { revalidate: 600 } });
  return (await response.json()) as YouTubeApiResponse;
}

async function fetch7DayTrending(regionCode: string): Promise<YouTubeApiResponse> {
  // Fetch a larger pool (top 50) from mostPopular and randomly sample 10.
  // YouTube's free API has no native "7-day trending" endpoint; this gives
  // genuinely different videos from today's top 10 (positions 11–50 vary).
  const url =
    `${BASE_URL}/videos` +
    `?part=snippet,statistics` +
    `&chart=mostPopular` +
    `&regionCode=${regionCode}` +
    `&videoCategoryId=28` +
    `&maxResults=50` +
    `&key=${YOUTUBE_API_KEY}`;

  const response = await fetch(url, { next: { revalidate: 600 } });
  const data = (await response.json()) as YouTubeApiResponse;

  if (data.error || !data.items || data.items.length === 0) return data;

  // Shuffle and pick 10 from the broader pool
  const shuffled = [...data.items].sort(() => Math.random() - 0.5).slice(0, 10);
  return { ...data, items: shuffled };
}

export async function fetchYouTubeTrending(
  country: Country,
  timeRange: TimeRange
): Promise<{ data: YouTubeVideo[]; isDemo: boolean; error?: string }> {
  const mockData = country === 'UK' ? MOCK_YOUTUBE_UK : MOCK_YOUTUBE_US;

  if (!YOUTUBE_API_KEY) {
    return { data: mockData, isDemo: true, error: 'YOUTUBE_API_KEY not configured' };
  }

  try {
    const regionCode = getCountryGeoCode(country);
    const data = timeRange === '7days'
      ? await fetch7DayTrending(regionCode)
      : await fetchTodayTrending(regionCode);

    if (data.error) {
      const msg = data.error.message ?? 'YouTube API error';
      console.error('[YouTube] API error:', msg);
      return { data: mockData, isDemo: true, error: msg };
    }

    if (!data.items || data.items.length === 0) {
      return { data: mockData, isDemo: true, error: 'No videos returned' };
    }

    const items = data.items
      .map(mapItemToVideo)
      .filter((v): v is YouTubeVideo => v !== null);

    return { data: items, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[YouTube] Error for ${country}:`, message);
    return { data: mockData, isDemo: true, error: message };
  }
}
