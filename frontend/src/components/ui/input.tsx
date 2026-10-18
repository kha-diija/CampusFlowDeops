import * as React from 'react'
import { Eye, EyeOff, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type = 'text', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const shouldShowPassword = type === 'password'

    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className="block text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-muted">{icon}</div>}
          <input
            id={inputId}
            ref={ref}
            type={shouldShowPassword && showPassword ? 'text' : type}
            className={cn(
              'w-full rounded-xl border border-border bg-[#0D0D0D] px-3 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30 disabled:cursor-not-allowed disabled:opacity-50',
              icon ? 'pl-10' : '',
              shouldShowPassword ? 'pr-10' : '',
              error ? 'border-error/60' : '',
              className,
            )}
            aria-invalid={Boolean(error)}
            {...props}
          />
          {shouldShowPassword && (
            <button
              type="button"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute inset-y-0 right-3 flex items-center text-text-muted hover:text-text-primary"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs text-error" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export function SearchInput({ value, onChange, placeholder = 'Rechercher...', className }: {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-border bg-[#0D0D0D] py-2.5 pl-10 pr-10 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-white/5 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-text-secondary">
        ⌘K
      </span>
    </div>
  )
}
