import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/pages/auth/LoginPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { MainLayout } from '@/components/layout/MainLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { useAuth } from '@/hooks/useAuth'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <AuthLayout>
              <ForgotPasswordPage />
            </AuthLayout>
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicOnlyRoute>
            <AuthLayout>
              <ResetPasswordPage />
            </AuthLayout>
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
