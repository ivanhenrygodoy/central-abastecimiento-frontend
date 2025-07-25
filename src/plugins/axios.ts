import axios from 'axios'

// Crear instancia de axios con configuración básica
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Exportar la instancia para usar en otros archivos
export default api
