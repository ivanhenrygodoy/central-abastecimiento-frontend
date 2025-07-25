import api from '@/plugins/axios'
import type { PaginateResponse, ResponseProductos } from '../interfaces/indexProductos'

interface ProductoParams {
  page: number
  paginate: number
  filtro?: string
}

export const indexManteProductosService = {
  async listadoProductos(
    page: number = 1,
    paginate: number = 10,
    filtro?: string,
  ): Promise<PaginateResponse> {
    const token = localStorage.getItem('token')

    const params: ProductoParams = {
      //
      page: page,
      paginate: paginate,
    }

    // Solo agregar filtro si existe y no está vacío
    if (filtro && filtro.trim()) {
      params.filtro = filtro
    }

    const response = await api.get('/api/mantenimiento-producto/index-product', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
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
