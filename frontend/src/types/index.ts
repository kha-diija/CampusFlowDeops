export type Role = 'ETUDIANT' | 'PERSONNEL'

export interface User {
  id: number
  nom: string
  prenom: string
  email: string
  role: Role
  autorisePublication?: boolean | null
}

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  token: string
  user: User
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface AuthState {
  user: User | null
  token: string | null
}
