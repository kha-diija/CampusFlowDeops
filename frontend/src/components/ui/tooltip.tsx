import type { ReactNode } from 'react'

export function Tooltip({ content, children }: { content: string; children: ReactNode }) {
  return (
    <div className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-[#101010] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-text-secondary opacity-0 transition group-hover:opacity-100">
        {content}
      </span>
    </div>
  )
}
