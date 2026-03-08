// ============================================================
// Dev.to API Client
// No auth needed for reading public articles
// https://developers.forem.com/api
// ============================================================

import type { DevToArticle, TimeRange } from '../types';
import { MOCK_DEVTO } from '../mock-data';

const BASE_URL = 'https://dev.to/api';

interface DevToApiArticle {
  id: number;
  title: string;
  description?: string;
  url: string;
  canonical_url?: string;
  cover_image?: string | null;
  tag_list: string[];
  positive_reactions_count: number;
  comments_count: number;
  reading_time_minutes?: number;
  published_at: string;
  user: {
    name: string;
  };
}

export async function fetchDevTo(
  timeRange: TimeRange
): Promise<{ data: DevToArticle[]; isDemo: boolean; error?: string }> {
  try {
    // top=1 → top articles from last 1 day, top=7 → last 7 days
    const top = timeRange === 'today' ? 1 : 7;
    const url = `${BASE_URL}/articles?top=${top}&per_page=10`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'TechnologyTrends/1.0',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const msg = `Dev.to API returned ${response.status}`;
      console.error('[Dev.to] Error:', msg);
      return { data: MOCK_DEVTO, isDemo: true, error: msg };
    }

    const raw = (await response.json()) as DevToApiArticle[];

    if (!Array.isArray(raw) || raw.length === 0) {
      return { data: MOCK_DEVTO, isDemo: true, error: 'No articles returned' };
    }

    const articles: DevToArticle[] = raw.slice(0, 10).map((a) => ({
      id: `devto-${a.id}`,
      title: a.title,
      url: a.canonical_url ?? a.url,
      description: a.description ?? undefined,
      tags: a.tag_list.slice(0, 4),
      reactions: a.positive_reactions_count,
      commentCount: a.comments_count,
      readingTime: a.reading_time_minutes,
      coverImage: a.cover_image ?? undefined,
      author: a.user.name,
      publishedAt: a.published_at,
    }));

    return { data: articles, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Dev.to] Error:', message);
    return { data: MOCK_DEVTO, isDemo: true, error: message };
  }
}
