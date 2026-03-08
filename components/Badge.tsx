import { cn } from '@/lib/utils';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'demo';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary:   'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
  secondary: 'bg-violet-500/20 text-violet-400 border border-violet-500/30',
  success:   'bg-green-500/20 text-green-400 border border-green-500/30',
  warning:   'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  danger:    'bg-red-500/20 text-red-400 border border-red-500/30',
  ghost:     'bg-gray-700/50 text-gray-400 border border-gray-600/30',
  demo:      'bg-amber-500/30 text-amber-300 border border-amber-500/50 font-semibold',
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2.5 py-1',
};

export function Badge({ children, variant = 'ghost', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium whitespace-nowrap',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
    >
      {children}
    </span>
  );
}
