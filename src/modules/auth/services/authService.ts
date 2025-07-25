import api from '@/plugins/axios'
import type { LoginCredentials, LoginResponse } from '../interfaces/login'

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post('/api/login', credentials)
    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/logout')
    localStorage.removeItem('token')
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  setToken(token: string): void {
    localStorage.setItem('token', token)
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },
}
