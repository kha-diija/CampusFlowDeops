import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { LoginRequest, LoginResponse, Role, User } from '@/types'
import { authService } from '@/services/authService'

interface AuthContextValue {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (payload: LoginRequest) => Promise<LoginResponse>
  logout: () => void
  hasRole: (role: Role) => boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY_TOKEN = 'campusflow-token'
const STORAGE_KEY_USER = 'campusflow-user'

const readStorage = (key: string): string | null => {
  const localValue = localStorage.getItem(key)
  if (localValue) {
    return localValue
  }

  return sessionStorage.getItem(key)
}

const readUserStorage = (): User | null => {
  const localUser = localStorage.getItem(STORAGE_KEY_USER)
  if (localUser) {
    return JSON.parse(localUser) as User
  }

  const sessionUser = sessionStorage.getItem(STORAGE_KEY_USER)
  if (sessionUser) {
    return JSON.parse(sessionUser) as User
  }

  return null
}

const persistAuth = (token: string | null, user: User | null, rememberMe: boolean) => {
  localStorage.removeItem(STORAGE_KEY_TOKEN)
  localStorage.removeItem(STORAGE_KEY_USER)
  sessionStorage.removeItem(STORAGE_KEY_TOKEN)
  sessionStorage.removeItem(STORAGE_KEY_USER)

  if (!token || !user) {
    return
  }

  const storage = rememberMe ? localStorage : sessionStorage
  storage.setItem(STORAGE_KEY_TOKEN, token)
  storage.setItem(STORAGE_KEY_USER, JSON.stringify(user))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => readStorage(STORAGE_KEY_TOKEN))
  const [user, setUser] = useState<User | null>(() => readUserStorage())

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = readStorage(STORAGE_KEY_TOKEN)
      if (!storedToken) {
        return
      }

      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
        setToken(storedToken)
      } catch {
        localStorage.removeItem(STORAGE_KEY_TOKEN)
        localStorage.removeItem(STORAGE_KEY_USER)
        sessionStorage.removeItem(STORAGE_KEY_TOKEN)
        sessionStorage.removeItem(STORAGE_KEY_USER)
        setUser(null)
        setToken(null)
      }
    }

    void restoreSession()
  }, [])

  const login = async (payload: LoginRequest) => {
    const response = await authService.login(payload)
    persistAuth(response.token, response.user, payload.rememberMe ?? true)
    setToken(response.token)
    setUser(response.user)
    return response
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    authService.logout()
  }

  const hasRole = useCallback((role: Role) => user?.role === role, [user])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
      hasRole,
    }),
    [token, user, hasRole],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
