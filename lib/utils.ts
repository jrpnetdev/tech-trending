import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, parseISO, subDays, format } from 'date-fns';
import type { TrendCategory, TrendDirection, Country } from './types';

// ─── Tailwind Class Merging ────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Date Formatting ──────────────────────────────────────────

export function timeAgo(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return 'recently';
  }
}

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'd MMM yyyy');
  } catch {
    return dateString;
  }
}

export function getSevenDaysAgo(): string {
  return format(subDays(new Date(), 7), 'yyyy-MM-dd');
}

export function getYesterdayFormatted(): string {
  return format(subDays(new Date(), 1), 'yyyy-MM-dd');
}

export function getTodayFormatted(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

// ─── Number Formatting ────────────────────────────────────────

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
  return num.toString();
}

export function formatViewCount(countStr?: string): string {
  if (!countStr) return '';
  const num = parseInt(countStr, 10);
  if (isNaN(num)) return countStr;
  return formatNumber(num);
}

// ─── Country Utilities ────────────────────────────────────────

export function getCountryFlag(country: Country): string {
  return country === 'UK' ? '🇬🇧' : '🇺🇸';
}

export function getCountryLabel(country: Country): string {
  return country === 'UK' ? 'United Kingdom' : 'United States';
}

export function getCountryGeoCode(country: Country): string {
  return country === 'UK' ? 'GB' : 'US';
}

export function getCountryNewsCode(country: Country): string {
  return country === 'UK' ? 'gb' : 'us';
}

// ─── Category Utilities ───────────────────────────────────────

const CATEGORY_COLOURS: Record<TrendCategory, string> = {
  news: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  entertainment: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  sports: 'bg-green-500/20 text-green-400 border-green-500/30',
  technology: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  business: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  health: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  politics: 'bg-red-500/20 text-red-400 border-red-500/30',
  science: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  lifestyle: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  other: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export function getCategoryColour(category?: TrendCategory): string {
  if (!category) return CATEGORY_COLOURS.other;
  return CATEGORY_COLOURS[category] ?? CATEGORY_COLOURS.other;
}

// ─── Trend Direction ──────────────────────────────────────────

export function getDirectionColour(direction?: TrendDirection): string {
  switch (direction) {
    case 'up':     return 'text-green-400';
    case 'down':   return 'text-red-400';
    case 'new':    return 'text-amber-400';
    case 'hot':    return 'text-orange-400';
    default:       return 'text-gray-400';
  }
}

// ─── URL Utilities ────────────────────────────────────────────

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}

export function buildRedditUrl(permalink: string): string {
  return `https://www.reddit.com${permalink}`;
}

export function buildYouTubeUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

// ─── YouTube Category Map ─────────────────────────────────────

const YT_CATEGORY_MAP: Record<string, string> = {
  '1': 'Film & Animation',
  '2': 'Autos',
  '10': 'Music',
  '15': 'Pets & Animals',
  '17': 'Sports',
  '18': 'Short Movies',
  '19': 'Travel',
  '20': 'Gaming',
  '21': 'Videoblogging',
  '22': 'People & Blogs',
  '23': 'Comedy',
  '24': 'Entertainment',
  '25': 'News & Politics',
  '26': 'Howto & Style',
  '27': 'Education',
  '28': 'Science & Tech',
  '29': 'Nonprofits',
};

export function getYouTubeCategoryName(id?: string): string {
  if (!id) return 'Video';
  return YT_CATEGORY_MAP[id] ?? 'Video';
}

// ─── Rank Badge ───────────────────────────────────────────────

export function getRankBadgeStyle(rank: number): string {
  if (rank === 1) return 'bg-amber-500 text-black font-bold';
  if (rank === 2) return 'bg-gray-300 text-black font-bold';
  if (rank === 3) return 'bg-amber-700 text-white font-bold';
  return 'bg-gray-700 text-gray-300';
}
