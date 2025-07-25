export interface CreateProductData {
  nombre: string
  codigo: string
  id_categoria_producto: string
  id_establecimiento_origen: string
  documentos?: File[]
  nombre_documento?: string[]
}

export interface CreateProductResponse {
  status: number
  data: {
    message: string
  }
  errors: string[]
}

export interface Product {
  id?: number
  codigo?: string
  nombre?: string
  establecimiento_origen?: string
  categoria_producto?: string
  activo?: boolean
  // Campos para el formulario de creación
  id_categoria_producto?: string
  id_establecimiento_origen?: string
  documentos?: File[]
  nombre_documento?: string[]
}
