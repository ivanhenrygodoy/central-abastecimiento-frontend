export interface Producto {
  id: number
  nombre: string
  codigo: string
  id_categoria_producto: string
  id_establecimiento_origen: string
  activo: boolean
}

export interface PaginateResponse {
  current_page: number
  data: Producto[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {
    url: string | null
    label: string
    active: boolean
  }
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export interface ResponseProductos {
  nombre: string
  activo: boolean
}
