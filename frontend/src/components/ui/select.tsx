import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, children, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={selectId} className="block text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full appearance-none rounded-xl border border-border bg-[#0D0D0D] px-3 py-3 text-sm text-text-primary focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30 disabled:cursor-not-allowed disabled:opacity-50',
              error ? 'border-error/60' : '',
              className,
            )}
            aria-invalid={Boolean(error)}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    )
  },
)

Select.displayName = 'Select'
