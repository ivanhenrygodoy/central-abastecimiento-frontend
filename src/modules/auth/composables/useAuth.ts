import { AxiosError } from 'axios'
import { authService } from '../services/authService'
import { ref } from 'vue'
import router from '@/routes'
import type { LoginCredentials, LoginResponse } from '../interfaces/login'

export function useAuth() {
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.login(credentials)
      if (response.access_token) {
        authService.setToken(response.access_token)
        // Redirigir al dashboard o a la ruta deseada
        await router.push({ name: 'indexMantenimiento' })
      }
      return response
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        error.value = err.response?.data?.message || 'Error al iniciar sesión'
      } else {
        error.value = 'Error al iniciar sesión'
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      await router.push({ name: 'login' })
    } catch {
      // En caso de error, igual limpiamos el token localmente
      authService.setToken('')
      await router.push({ name: 'login' })
    }
  }

  const isAuthenticated = () => {
    return authService.isAuthenticated()
  }

  return {
    isLoading,
    error,
    login,
    logout,
    isAuthenticated,
  }
}
