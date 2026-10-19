import type { ReactNode } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg text-text-primary">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header title="Tableau de bord" />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
