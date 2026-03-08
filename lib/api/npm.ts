// ============================================================
// npm Downloads API Client
// Uses registry.npmjs.org for package metadata
// Uses api.npmjs.org for download counts
// No auth required
// ============================================================

import type { NpmPackage, TimeRange } from '../types';
import { MOCK_NPM } from '../mock-data';

// Curated list of popular/trending tech packages to track
const PACKAGES = [
  'react', 'typescript', 'next', 'tailwindcss', 'vite',
  'zod', 'openai', '@anthropic-ai/sdk', 'drizzle-orm', 'prisma',
  'shadcn-ui', 'trpc', 'zustand', 'tanstack-query', 'astro',
];

const HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'TechnologyTrends/1.0',
};

interface NpmDownloadResponse {
  downloads: number;
  package: string;
}

interface NpmRegistryPackage {
  name: string;
  description?: string;
  version?: string;
  keywords?: string[];
  time?: { modified?: string };
}

async function fetchDownloads(pkg: string, period: string): Promise<number> {
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/${period}/${encodeURIComponent(pkg)}`,
      { headers: HEADERS, next: { revalidate: 300 } }
    );
    if (!res.ok) return 0;
    const data = (await res.json()) as NpmDownloadResponse;
    return data.downloads ?? 0;
  } catch {
    return 0;
  }
}

async function fetchPackageMeta(pkg: string): Promise<NpmRegistryPackage | null> {
  try {
    const res = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`,
      { headers: HEADERS, next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    return (await res.json()) as NpmRegistryPackage;
  } catch {
    return null;
  }
}

export async function fetchNpmPackages(
  timeRange: TimeRange
): Promise<{ data: NpmPackage[]; isDemo: boolean; error?: string }> {
  try {
    const period = timeRange === 'today' ? 'last-day' : 'last-week';

    // Fetch downloads and metadata in parallel
    const [downloads, metas] = await Promise.all([
      Promise.all(PACKAGES.map((pkg) => fetchDownloads(pkg, period))),
      Promise.all(PACKAGES.map((pkg) => fetchPackageMeta(pkg))),
    ]);

    const packages: NpmPackage[] = PACKAGES.map((pkg, i) => {
      const meta = metas[i];
      return {
        id: `npm-${pkg}`,
        name: pkg,
        description: meta?.description,
        weeklyDownloads: downloads[i],
        version: meta?.version,
        keywords: meta?.keywords?.slice(0, 4) ?? [],
        url: `https://www.npmjs.com/package/${encodeURIComponent(pkg)}`,
        publishedAt: meta?.time?.modified,
      };
    });

    // Sort by downloads descending, take top 10
    const sorted = packages
      .filter((p) => p.weeklyDownloads > 0)
      .sort((a, b) => b.weeklyDownloads - a.weeklyDownloads)
      .slice(0, 10);

    if (sorted.length === 0) {
      return { data: MOCK_NPM, isDemo: true, error: 'No download data returned' };
    }

    return { data: sorted, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[npm] Error:', message);
    return { data: MOCK_NPM, isDemo: true, error: message };
  }
}
