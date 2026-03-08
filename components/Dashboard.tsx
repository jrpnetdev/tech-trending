'use client';

import { useState, useEffect, useCallback } from 'react';
import { Globe, TrendingUp } from 'lucide-react';
import type { Country, TimeRange, SectionData, TrendItem, NewsItem, YouTubeVideo, StackOverflowQuestion, HackerNewsStory, DevToArticle, NpmPackage, CratesPackage, LobstersStory, DockerImage } from '@/lib/types';
import { getCountryFlag, getCountryLabel, cn } from '@/lib/utils';
import { Header } from './Header';
import { TrendsSection } from './TrendsSection';
import { NewsSection } from './NewsSection';
import { YouTubeSection } from './YouTubeSection';
import { StackOverflowSection } from './StackOverflowSection';
import { HackerNewsSection } from './HackerNewsSection';
import { DevToSection } from './DevToSection';
import { NpmSection } from './NpmSection';
import { CratesSection } from './CratesSection';
import { LobstersSection } from './LobstersSection';
import { DockerSection } from './DockerSection';
import { TrendsChart } from './TrendsChart';

// ─── Types ────────────────────────────────────────────────────

type ActiveTab = Country | 'Global';

interface CountryState {
  googleTrends: SectionData<TrendItem> | null;
  redditTrends: SectionData<TrendItem> | null;
  news: SectionData<NewsItem> | null;
  youtube: SectionData<YouTubeVideo> | null;
  stackoverflow: SectionData<StackOverflowQuestion> | null;
  hackerNews: SectionData<HackerNewsStory> | null;
  devto: SectionData<DevToArticle> | null;
  npm: SectionData<NpmPackage> | null;
  crates: SectionData<CratesPackage> | null;
  lobsters: SectionData<LobstersStory> | null;
  docker: SectionData<DockerImage> | null;
}

interface LoadingState {
  trends: boolean;
  news: boolean;
  youtube: boolean;
  stackoverflow: boolean;
  hackernews: boolean;
  devto: boolean;
  npm: boolean;
  crates: boolean;
  lobsters: boolean;
  docker: boolean;
}

const INITIAL_COUNTRY_STATE: CountryState = {
  googleTrends: null,
  redditTrends: null,
  news: null,
  youtube: null,
  stackoverflow: null,
  hackerNews: null,
  devto: null,
  npm: null,
  crates: null,
  lobsters: null,
  docker: null,
};

const INITIAL_LOADING: LoadingState = {
  trends: true,
  news: true,
  youtube: true,
  stackoverflow: true,
  hackernews: true,
  devto: true,
  npm: true,
  crates: true,
  lobsters: true,
  docker: true,
};

// ─── Data Fetching ────────────────────────────────────────────

async function fetchAllCountryData(
  country: Country,
  timeRange: TimeRange,
  setState: React.Dispatch<React.SetStateAction<Record<Country, CountryState>>>,
  setLoading: React.Dispatch<React.SetStateAction<LoadingState>>
) {
  const params = new URLSearchParams({ country, timeRange });
  const globalParams = new URLSearchParams({ timeRange });

  // Fetch all endpoints concurrently — sections load as they arrive
  const [trendsPromise, newsPromise, youtubePromise, soPromise, hnPromise, devtoPromise, npmPromise, cratesPromise, lobstersPromise, dockerPromise] = [
    fetch(`/api/trends?${params}`).then((r) => r.json()).catch(() => null),
    fetch(`/api/news?${params}`).then((r) => r.json()).catch(() => null),
    fetch(`/api/youtube?${params}`).then((r) => r.json()).catch(() => null),
    fetch(`/api/stackoverflow?${globalParams}`).then((r) => r.json()).catch(() => null),
    fetch(`/api/hackernews?${globalParams}`).then((r) => r.json()).catch(() => null),
    fetch(`/api/devto?${globalParams}`).then((r) => r.json()).catch(() => null),
    fetch(`/api/npm?${globalParams}`).then((r) => r.json()).catch(() => null),
    fetch(`/api/crates?${globalParams}`).then((r) => r.json()).catch(() => null),
    fetch(`/api/lobsters?${globalParams}`).then((r) => r.json()).catch(() => null),
    fetch(`/api/docker?${globalParams}`).then((r) => r.json()).catch(() => null),
  ];

  // Handle each as it resolves
  trendsPromise.then((data) => {
    setState((prev) => ({
      ...prev,
      [country]: {
        ...prev[country],
        googleTrends: data?.google ?? null,
        redditTrends: data?.reddit ?? null,
      },
    }));
    setLoading((prev) => ({ ...prev, trends: false }));
  });

  newsPromise.then((data) => {
    setState((prev) => ({
      ...prev,
      [country]: { ...prev[country], news: data ?? null },
    }));
    setLoading((prev) => ({ ...prev, news: false }));
  });

  youtubePromise.then((data) => {
    setState((prev) => ({
      ...prev,
      [country]: { ...prev[country], youtube: data ?? null },
    }));
    setLoading((prev) => ({ ...prev, youtube: false }));
  });

  soPromise.then((data) => {
    setState((prev) => ({
      ...prev,
      [country]: { ...prev[country], stackoverflow: data ?? null },
    }));
    setLoading((prev) => ({ ...prev, stackoverflow: false }));
  });

  hnPromise.then((data) => {
    setState((prev) => ({
      ...prev,
      [country]: { ...prev[country], hackerNews: data ?? null },
    }));
    setLoading((prev) => ({ ...prev, hackernews: false }));
  });

  devtoPromise.then((data) => {
    setState((prev) => ({
      ...prev,
      [country]: { ...prev[country], devto: data ?? null },
    }));
    setLoading((prev) => ({ ...prev, devto: false }));
  });

  npmPromise.then((data) => {
    setState((prev) => ({
      ...prev,
      [country]: { ...prev[country], npm: data ?? null },
    }));
    setLoading((prev) => ({ ...prev, npm: false }));
  });

  cratesPromise.then((data) => {
    setState((prev) => ({
      ...prev,
      [country]: { ...prev[country], crates: data ?? null },
    }));
    setLoading((prev) => ({ ...prev, crates: false }));
  });

  lobstersPromise.then((data) => {
    setState((prev) => ({
      ...prev,
      [country]: { ...prev[country], lobsters: data ?? null },
    }));
    setLoading((prev) => ({ ...prev, lobsters: false }));
  });

  dockerPromise.then((data) => {
    setState((prev) => ({
      ...prev,
      [country]: { ...prev[country], docker: data ?? null },
    }));
    setLoading((prev) => ({ ...prev, docker: false }));
  });

  // Await all for final clean-up
  await Promise.allSettled([trendsPromise, newsPromise, youtubePromise, soPromise, hnPromise, devtoPromise, npmPromise, cratesPromise, lobstersPromise, dockerPromise]);
}

// ─── Tab Components ───────────────────────────────────────────

function CountryTab({
  country,
  isActive,
  onClick,
}: {
  country: Country;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-150 border-b-2',
        isActive
          ? 'bg-gray-800/80 text-white border-indigo-500'
          : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-800/40'
      )}
    >
      <span className="text-base">{getCountryFlag(country)}</span>
      <span>{getCountryLabel(country)}</span>
    </button>
  );
}

function GlobalTab({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-150 border-b-2',
        isActive
          ? 'bg-gray-800/80 text-white border-indigo-500'
          : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-800/40'
      )}
    >
      <Globe size={15} />
      <span>Global</span>
    </button>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Global');
  const [activeCountry, setActiveCountry] = useState<Country>('UK');
  const [timeRange, setTimeRange] = useState<TimeRange>('today');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState<LoadingState>(INITIAL_LOADING);
  const [data, setData] = useState<Record<Country, CountryState>>({
    UK: { ...INITIAL_COUNTRY_STATE },
    US: { ...INITIAL_COUNTRY_STATE },
  });

  const fetchData = useCallback(async (country: Country, range: TimeRange) => {
    setLoading(INITIAL_LOADING);
    await fetchAllCountryData(country, range, setData, setLoading);
    setLastUpdated(new Date().toISOString());
  }, []);

  // Fetch on mount and when filters change
  useEffect(() => {
    fetchData(activeCountry, timeRange);
  }, [activeCountry, timeRange, fetchData]);

  const handleRefresh = () => {
    fetchData(activeCountry, timeRange);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab !== 'Global') {
      setActiveCountry(tab);
    }
  };

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    setLoading(INITIAL_LOADING);
    setData({
      UK: { ...INITIAL_COUNTRY_STATE },
      US: { ...INITIAL_COUNTRY_STATE },
    });
  };

  const isAnyLoading = Object.values(loading).some(Boolean);
  const countryData = data[activeCountry];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <Header
        timeRange={timeRange}
        onTimeRangeChange={handleTimeRangeChange}
        onRefresh={handleRefresh}
        isLoading={isAnyLoading}
        lastUpdated={lastUpdated}
      />

      {/* Main content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-800 mb-6">
          <GlobalTab
            isActive={activeTab === 'Global'}
            onClick={() => handleTabChange('Global')}
          />
          <CountryTab
            country="UK"
            isActive={activeTab === 'UK'}
            onClick={() => handleTabChange('UK')}
          />
          <CountryTab
            country="US"
            isActive={activeTab === 'US'}
            onClick={() => handleTabChange('US')}
          />
          <div className="ml-auto pb-2">
            <span className="text-xs text-gray-600">
              {timeRange === 'today' ? "Today's trends" : 'Last 7 days'}
            </span>
          </div>
        </div>

        {/* Dashboard grid */}
        <div className="space-y-6 animate-fade-in-up">

          {activeTab === 'Global' ? (
            <>
              {/* Row 1: GitHub Trending + Hacker News */}
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <TrendsSection
                  googleTrends={countryData.googleTrends}
                  isLoading={loading.trends}
                  showChart={false}
                />
                <HackerNewsSection
                  hnData={countryData.hackerNews}
                  isLoading={loading.hackernews}
                />
              </section>

              {/* Row 2: Star Activity chart — full width */}
              {!loading.trends && countryData.googleTrends && countryData.googleTrends.data.length > 0 && (
                <section>
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-700/60 flex items-center justify-center">
                        <TrendingUp size={14} className="text-green-400" />
                      </div>
                      <div>
                        <h2 className="text-sm font-semibold text-white uppercase tracking-wide">
                          Star Activity Over Time
                        </h2>
                        <p className="text-xs text-gray-500">Simulated relative interest (0–100)</p>
                      </div>
                    </div>
                    <TrendsChart trends={countryData.googleTrends.data} />
                  </div>
                </section>
              )}

              {/* Row 3: Dev.to + Stack Overflow */}
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <DevToSection
                  devtoData={countryData.devto}
                  isLoading={loading.devto}
                />
                <StackOverflowSection
                  soData={countryData.stackoverflow}
                  isLoading={loading.stackoverflow}
                />
              </section>

              {/* Row 4: npm Downloads + crates.io */}
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <NpmSection
                  npmData={countryData.npm}
                  isLoading={loading.npm}
                />
                <CratesSection
                  cratesData={countryData.crates}
                  isLoading={loading.crates}
                />
              </section>

              {/* Row 5: Lobste.rs + Docker Hub */}
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <LobstersSection
                  lobstersData={countryData.lobsters}
                  isLoading={loading.lobsters}
                />
                <DockerSection
                  dockerData={countryData.docker}
                  isLoading={loading.docker}
                />
              </section>
            </>
          ) : (
            <>
              {/* Row 1: News + YouTube side by side */}
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <NewsSection
                  newsData={countryData.news}
                  isLoading={loading.news}
                />
                <YouTubeSection
                  youtubeData={countryData.youtube}
                  isLoading={loading.youtube}
                />
              </section>

              {/* Row 2: Reddit Trending */}
              <section>
                <TrendsSection
                  redditTrends={countryData.redditTrends}
                  isLoading={loading.trends}
                />
              </section>
            </>
          )}

        </div>

        {/* Footer */}
        <footer className="mt-12 pb-6 text-center">
          <p className="text-xs text-gray-600">
            Technology Trends — Data sourced from GitHub, Hacker News, Dev.to, Reddit, NewsAPI, YouTube, Stack Overflow, npm, crates.io, Lobste.rs &amp; Docker Hub.
            Refresh for latest data.
          </p>
        </footer>
      </main>
    </div>
  );
}
