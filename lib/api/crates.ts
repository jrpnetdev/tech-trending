// ============================================================
// crates.io API Client
// Uses crates.io/api/v1 — no auth required
// ============================================================

import type { CratesPackage, TimeRange } from '../types';
import { MOCK_CRATES } from '../mock-data';

const BASE_URL = 'https://crates.io/api/v1';

const HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'TechnologyTrends/1.0 (https://github.com/your/repo)',
};

interface CrateItem {
  id: string;
  name: string;
  description?: string;
  newest_version?: string;
  recent_downloads?: number;
  downloads?: number;
  keywords?: string[];
  updated_at?: string;
}

interface CratesResponse {
  crates: CrateItem[];
}

export async function fetchCrates(
  timeRange: TimeRange
): Promise<{ data: CratesPackage[]; isDemo: boolean; error?: string }> {
  // crates.io sorts by recent_downloads (last 90 days) — same endpoint for both time ranges
  // For 7days we use total downloads as a secondary signal
  const sort = timeRange === 'today' ? 'recent-downloads' : 'downloads';

  try {
    const res = await fetch(
      `${BASE_URL}/crates?sort=${sort}&per_page=10`,
      { headers: HEADERS, next: { revalidate: 300 } }
    );

    if (!res.ok) {
      return { data: MOCK_CRATES, isDemo: true, error: `crates.io API returned ${res.status}` };
    }

    const json = (await res.json()) as CratesResponse;
    const items = json.crates ?? [];

    if (items.length === 0) {
      return { data: MOCK_CRATES, isDemo: true, error: 'No crates returned' };
    }

    const crates: CratesPackage[] = items.map((item) => ({
      id: `cr-${item.id}`,
      name: item.name,
      description: item.description,
      recentDownloads: item.recent_downloads ?? 0,
      totalDownloads: item.downloads ?? 0,
      version: item.newest_version,
      keywords: item.keywords?.slice(0, 4) ?? [],
      url: `https://crates.io/crates/${item.name}`,
      updatedAt: item.updated_at ?? new Date().toISOString(),
    }));

    return { data: crates, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[crates.io] Error:', message);
    return { data: MOCK_CRATES, isDemo: true, error: message };
  }
}
