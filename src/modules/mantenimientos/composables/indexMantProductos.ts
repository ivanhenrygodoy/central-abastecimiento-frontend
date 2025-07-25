import { ref } from 'vue'
import { indexManteProductosService } from '../services/indexMantProductosService'
import type { PaginateResponse, Producto } from '../interfaces/indexProductos'

export function useProductos() {
  const productos = ref<Producto[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const paginationData = ref<Omit<PaginateResponse, 'data'> | null>(null)
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const fetchProductos = async (page: number = 1, paginate: number = 10) => {
    loading.value = true
    error.value = null
    try {
      currentPage.value = page
      itemsPerPage.value = paginate

      const response = await indexManteProductosService.listadoProductos(page, paginate)
      productos.value = response.data
      paginationData.value = {
        current_page: response.current_page,
        first_page_url: response.first_page_url,
        from: response.from,
        last_page: response.last_page,
        last_page_url: response.last_page_url,
        links: response.links,
        next_page_url: response.next_page_url,
        path: response.path,
        per_page: response.per_page,
        prev_page_url: response.prev_page_url,
        to: response.to,
        total: response.total,
      }
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error desconocido al obtener productos'
      console.error('Error en fecthProductos:', error.value)
    } finally {
      loading.value = false
    }
  }

  const nextPage = () => {
    if (paginationData.value && currentPage.value < paginationData.value.last_page) {
      fetchProductos(currentPage.value + 1, itemsPerPage.value)
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      fetchProductos(currentPage.value - 1, itemsPerPage.value)
    }
  }

  const goToPage = (page: number) => {
    if (paginationData.value && page >= 1 && page <= paginationData.value.last_page) {
      fetchProductos(page, itemsPerPage.value)
    }
  }

  const changeItemsPerPage = (newItemsPerPage: number) => {
    fetchProductos(1, newItemsPerPage) // Volver a la primera página al cambiar items por página
  }

  return {
    productos,
    loading,
    error,
    paginationData,
    currentPage,
    itemsPerPage,
    fetchProductos,
    nextPage,
    prevPage,
    goToPage,
    changeItemsPerPage,
  }
}
