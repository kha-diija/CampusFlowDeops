import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, label, ...props }, ref) => (
  <label className="flex items-center gap-2 text-sm text-text-secondary">
    <input
      ref={ref}
      type="checkbox"
      className={cn('h-4 w-4 rounded border-border bg-[#0D0D0D] text-brand-orange focus:ring-brand-orange', className)}
      {...props}
    />
    {label && <span>{label}</span>}
  </label>
))

Checkbox.displayName = 'Checkbox'
