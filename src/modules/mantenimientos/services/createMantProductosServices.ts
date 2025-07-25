import api from '@/plugins/axios'
import type { CreateProductData, CreateProductResponse } from '../interfaces/createProductos'

export const createMantProductosService = {
  async createProducto(data: CreateProductData | FormData): Promise<CreateProductResponse> {
    const token = localStorage.getItem('token')

    const response = await api.post('/api/mantenimiento-producto/create-product', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    })

    return response.data
  },
}
