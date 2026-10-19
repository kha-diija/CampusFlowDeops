import { cn } from '@/lib/utils'

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <div
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange via-brand-highlight to-brand-warm text-xs font-bold text-white',
        className,
      )}
    >
      {initials}
    </div>
  )
}
