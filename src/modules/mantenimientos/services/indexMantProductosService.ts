import api from '@/plugins/axios'
import type { PaginateResponse, ResponseProductos } from '../interfaces/indexProductos'

export const indexManteProductosService = {
  async listadoProductos(page: number = 1, paginate: number = 10): Promise<PaginateResponse> {
    const token = localStorage.getItem('token')
    const response = await api.get('/api/mantenimiento-producto/index-product', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        paginate: paginate,
      },
    })
    return response.data
  },

  async getCategorias(): Promise<ResponseProductos> {
    const token = localStorage.getItem('token')
    const response = await api.get('/api/catalogos/index', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  },
}
