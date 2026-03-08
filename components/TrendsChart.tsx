'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import type { TrendItem } from '@/lib/types';

interface TrendsChartProps {
  trends: TrendItem[];
}

// Generate simulated interest-over-time data for chart display
function generateChartData(trends: TrendItem[], timeRange: '7d' | '1d') {
  const topTrends = trends.slice(0, 5);
  const COLOURS = ['#6366f1', '#8b5cf6', '#ec4899', '#22c55e', '#f59e0b'];

  const points = timeRange === '7d' ? 7 : 24;
  const labels = timeRange === '7d'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : Array.from({ length: 24 }, (_, i) => `${i}:00`);

  return {
    data: labels.map((label, i) =>
      topTrends.reduce(
        (obj, trend, tIdx) => ({
          ...obj,
          [trend.title.slice(0, 20)]: Math.round(
            50 + 50 * Math.sin((i / points) * Math.PI * 2 + tIdx * 1.2) *
            (1 - tIdx * 0.15)
          ),
        }),
        { name: label }
      )
    ),
    series: topTrends.map((trend, idx) => ({
      key: trend.title.slice(0, 20),
      colour: COLOURS[idx] ?? '#6366f1',
    })),
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl text-xs">
      <p className="text-gray-400 mb-1.5 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span className="text-gray-300 truncate max-w-[140px]">{entry.name}</span>
          <span className="font-semibold text-white ml-auto">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function TrendsChart({ trends }: TrendsChartProps) {
  if (trends.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-gray-500 text-sm">
        No trend data to chart
      </div>
    );
  }

  const { data, series } = generateChartData(trends, '7d');

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.5} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6b7280', fontSize: 10 }}
            axisLine={{ stroke: '#374151' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#6b7280', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {series.map(({ key, colour }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colour}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
