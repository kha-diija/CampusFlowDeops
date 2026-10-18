import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={textareaId} className="block text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'min-h-[120px] w-full rounded-xl border border-border bg-[#0D0D0D] px-3 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30',
            error ? 'border-error/60' : '',
            className,
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
