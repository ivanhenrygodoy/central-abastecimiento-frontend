import { useToast } from 'primevue/usetoast'
import type { CreateProductData } from '../interfaces/createProductos'
import { createMantProductosService } from '../services/createMantProductosServices'
import { ref } from 'vue'
import axios from 'axios'

export function createProductos() {
  const toast = useToast()
  const creating = ref(false)
  const error = ref<string | null>(null)
  const createProductos = async (data: CreateProductData | FormData) => {
    creating.value = true
    try {
      const response = await createMantProductosService.createProducto(data)

      toast.add({
        severity: 'success',
        summary: 'Exito',
        detail: response.data?.message[0] || 'Producto creado correctamente',
        life: 3000,
      })
      return { success: true, data: response }
    } catch (error: unknown) {
      console.error('Error en createProductos:', error)

      let errorMessage = 'Error al crear producto'

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          errorMessage
      }

      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 3000,
      })

      return { success: false, error: errorMessage }
    } finally {
      creating.value = false
    }
  }

  return {
    creating,
    createProductos,
    error,
  }
}
