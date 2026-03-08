// ============================================================
// Docker Hub API Client
// Uses hub.docker.com/v2 — no auth required for public data
// ============================================================

import type { DockerImage, TimeRange } from '../types';
import { MOCK_DOCKER } from '../mock-data';

const HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'TechnologyTrends/1.0',
};

interface DockerRepo {
  name: string;
  namespace?: string;
  description?: string;
  pull_count?: number;
  star_count?: number;
  is_official?: boolean;
  last_updated?: string;
}

interface DockerSearchResult {
  results: DockerRepo[];
}

export async function fetchDockerImages(
  timeRange: TimeRange
): Promise<{ data: DockerImage[]; isDemo: boolean; error?: string }> {
  // ordering=pull_count for most pulled; -last_updated for recently updated
  const ordering = timeRange === 'today' ? '-last_updated' : 'pull_count';

  try {
    // Fetch official library images (most reliable)
    const res = await fetch(
      `https://hub.docker.com/v2/repositories/library/?page_size=25&ordering=${ordering}`,
      { headers: HEADERS, next: { revalidate: 300 } }
    );

    if (!res.ok) {
      return { data: MOCK_DOCKER, isDemo: true, error: `Docker Hub API returned ${res.status}` };
    }

    const text = await res.text();
    if (text.trim().startsWith('<')) {
      return { data: MOCK_DOCKER, isDemo: true, error: 'Received HTML instead of JSON' };
    }

    const json = JSON.parse(text) as DockerSearchResult;
    const items = json.results ?? [];

    if (items.length === 0) {
      return { data: MOCK_DOCKER, isDemo: true, error: 'No repositories returned' };
    }

    // Filter to tech-relevant images and take top 10
    const techImages = items
      .filter((r) => r.pull_count && r.pull_count > 0)
      .slice(0, 10)
      .map((item) => ({
        id: `dk-${item.namespace ?? 'library'}-${item.name}`,
        name: item.namespace && item.namespace !== 'library'
          ? `${item.namespace}/${item.name}`
          : item.name,
        description: item.description,
        pullCount: item.pull_count ?? 0,
        starCount: item.star_count ?? 0,
        isOfficial: item.is_official ?? (item.namespace === 'library'),
        url: item.namespace && item.namespace !== 'library'
          ? `https://hub.docker.com/r/${item.namespace}/${item.name}`
          : `https://hub.docker.com/_/${item.name}`,
        updatedAt: item.last_updated,
      }));

    if (techImages.length === 0) {
      return { data: MOCK_DOCKER, isDemo: true, error: 'No valid images returned' };
    }

    return { data: techImages, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Docker Hub] Error:', message);
    return { data: MOCK_DOCKER, isDemo: true, error: message };
  }
}
