import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
      <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
      <p className="text-xs leading-relaxed">
        {message ?? 'Could not fetch live data. Showing demo data instead.'}
        {!process.env.NODE_ENV?.includes('production') && (
          <span className="block mt-1 text-amber-500/70">
            Add API keys to .env.local to see real data.
          </span>
        )}
      </p>
    </div>
  );
}
