import type { ReactNode } from 'react'

export function Dropdown({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  return (
    <div className="group relative inline-block">
      {trigger}
      <div className="pointer-events-none absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-border bg-[#101010] p-2 opacity-0 shadow-soft transition group-hover:pointer-events-auto group-hover:opacity-100">
        {children}
      </div>
    </div>
  )
}
