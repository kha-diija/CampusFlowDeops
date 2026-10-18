import type { ReactNode } from 'react'

export function Tabs({ tabs, children }: { tabs: string[]; children: ReactNode[] }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 rounded-full border border-border bg-[#0D0D0D] p-1">
        {tabs.map((tab) => (
          <button key={tab} type="button" className="rounded-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary">
            {tab}
          </button>
        ))}
      </div>
      <div>{children}</div>
    </div>
  )
}
