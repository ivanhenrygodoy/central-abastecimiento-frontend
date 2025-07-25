export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  access_token?: string
  user?: unknown
  message?: string
}
