'use client';

import { RefreshCw, TrendingUp, Calendar, Zap } from 'lucide-react';
import type { TimeRange } from '@/lib/types';
import { cn } from '@/lib/utils';

interface HeaderProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onRefresh: () => void;
  isLoading: boolean;
  lastUpdated?: string;
}

export function Header({
  timeRange,
  onTimeRangeChange,
  onRefresh,
  isLoading,
  lastUpdated,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0 shadow-lg">
              <TrendingUp size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">
                Technology Trends
              </h1>
              <p className="text-xs text-gray-500 leading-tight hidden sm:block">
                Tech Trends Dashboard
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Time range toggle */}
            <div className="flex items-center bg-gray-800 rounded-lg p-0.5 border border-gray-700">
              <button
                onClick={() => onTimeRangeChange('today')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150',
                  timeRange === 'today'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                )}
              >
                <Zap size={11} />
                <span className="hidden sm:inline">Today</span>
                <span className="sm:hidden">1d</span>
              </button>
              <button
                onClick={() => onTimeRangeChange('7days')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150',
                  timeRange === '7days'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                )}
              >
                <Calendar size={11} />
                <span className="hidden sm:inline">7 Days</span>
                <span className="sm:hidden">7d</span>
              </button>
            </div>

            {/* Last updated */}
            {lastUpdated && (
              <p className="text-xs text-gray-500 hidden lg:block">
                Updated {new Date(lastUpdated).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}

            {/* Refresh button */}
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border',
                'border-gray-700 bg-gray-800 text-gray-300',
                'hover:bg-gray-700 hover:text-white transition-all duration-150',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              title="Refresh all data"
            >
              <RefreshCw
                size={12}
                className={cn('transition-transform duration-700', isLoading && 'animate-spin')}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
