import * as React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border/80 bg-gradient-to-b from-[#111111] to-[#0A0A0A] p-5 shadow-soft',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4 flex items-center justify-between', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-base font-semibold text-text-primary', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-4', className)} {...props} />
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
}: {
  title: string
  value: string
  icon: React.ReactNode
  trend?: number
  trendLabel?: string
}) {
  const positive = (trend ?? 0) >= 0

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary">{title}</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold text-text-primary">{value}</span>
          </div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-brand-orange">
          {icon}
        </div>
      </div>
      {typeof trend === 'number' && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium',
              positive ? 'bg-success/10 text-success' : 'bg-error/10 text-error',
            )}
          >
            {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(trend)}%
          </span>
          <span className="text-text-secondary">{trendLabel}</span>
        </div>
      )}
    </Card>
  )
}
