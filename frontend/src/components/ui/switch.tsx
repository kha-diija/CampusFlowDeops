import { cn } from '@/lib/utils'

export function Switch({ checked, onCheckedChange, label }: { checked: boolean; onCheckedChange: (value: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full border transition-colors',
        checked ? 'border-brand-orange bg-brand-orange/30' : 'border-border bg-white/10',
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 rounded-full bg-white transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1',
        )}
      />
      {label && <span className="ml-3 text-sm text-text-secondary">{label}</span>}
    </button>
  )
}
