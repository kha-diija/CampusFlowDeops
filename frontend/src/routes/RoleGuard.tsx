import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import type { Role } from '@/types'

export function RoleGuard({ role, children }: { role: Role; children: ReactNode }) {
  const { user } = useAuth()

  if (!user || user.role !== role) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
