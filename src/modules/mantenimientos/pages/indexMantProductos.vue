<template>
  <div>
    <!-- Navbar general con contenido como slot -->
    <NavBar title="Gestión de productos">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="card">
          <DataTable
            ref="dt"
            v-model:selection="selectedProducts"
            :value="productos"
            dataKey="id"
            :paginator="true"
            :rows="itemsPerPage"
            :totalRecords="paginationData?.total || 0"
            :first="
              paginationData ? (paginationData.current_page - 1) * paginationData.per_page : 0
            "
            :filters="filters"
            scrollable
            scrollHeight="600px"
            class="w-full"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} productos"
            @page="onPageChange"
            lazy
          >
            <template #header>
              <div class="flex flex-wrap gap-2 justify-left">
                <IconField>
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText v-model="filters['global'].value" placeholder="Search..." />
                </IconField>
                <div class="flex gap-2">
                  <Button label="Nuevo producto" icon="pi pi-plus" size="small" @click="openNew" />
                </div>
                <div class="flex gap-2">
                  <Button
                    label="Regresar"
                    icon="pi pi-arrow-left"
                    outlined
                    size="small"
                    class="p-button-sm"
                    @click="volver"
                  />
                </div>
              </div>
            </template>

            <Column field="codigo" header="Código" sortable style="min-width: 10rem"></Column>
            <Column field="nombre" header="Nombre" sortable style="min-width: 18rem"></Column>
            <Column
              field="establecimiento_origen"
              header="Establecimiento"
              sortable
              style="min-width: 16rem"
            ></Column>
            <Column
              field="categoria_producto"
              header="Categoría"
              sortable
              style="min-width: 14rem"
            ></Column>
            <Column field="activo" header="Estado" sortable style="min-width: 8rem">
              <template #body="slotProps">
                <Tag
                  :value="slotProps.data.activo ? 'Activo' : 'Inactivo'"
                  :severity="slotProps.data.activo ? 'success' : 'danger'"
                />
              </template>
            </Column>

            <Column header="Acciones" :exportable="false" style="min-width: 12rem">
              <template #body="slotProps">
                <Button
                  icon="pi pi-pencil"
                  outlined
                  rounded
                  class="mr-2"
                  @click="editProduct(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  outlined
                  rounded
                  severity="danger"
                  @click="confirmDeleteProduct(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>

          <!-- Mostrar mensaje de error si existe -->
          <div v-if="error" class="text-red-500 mt-4 p-4 bg-red-50 rounded border border-red-200">
            {{ error }}
          </div>
        </div>
      </div>

      <Dialog
        v-model:visible="productDialog"
        :style="{ width: '500px' }"
        header="Crear Producto"
        :modal="true"
      >
        <div class="flex flex-col gap-6">
          <div>
            <label for="nombre" class="block font-bold mb-3">Nombre *</label>
            <InputText
              id="nombre"
              v-model.trim="product.nombre"
              required="true"
              autofocus
              :invalid="submitted && !product.nombre"
              fluid
            />
            <small v-if="submitted && !product.nombre" class="text-red-500"
              >El nombre es requerido.</small
            >
          </div>

          <div>
            <label for="codigo" class="block font-bold mb-3">Código *</label>
            <InputText
              id="codigo"
              v-model.trim="product.codigo"
              required="true"
              :invalid="submitted && !product.codigo"
              fluid
            />
            <small v-if="submitted && !product.codigo" class="text-red-500"
              >El código es requerido.</small
            >
          </div>

          <div>
            <label for="categoria" class="block font-bold mb-3">ID Categoría *</label>
            <InputText
              id="categoria"
              v-model.trim="product.id_categoria_producto"
              required="true"
              :invalid="submitted && !product.id_categoria_producto"
              fluid
              placeholder="Por ejemplo: 3"
            />
            <small v-if="submitted && !product.id_categoria_producto" class="text-red-500"
              >El ID de categoría es requerido.</small
            >
          </div>

          <div>
            <label for="establecimiento" class="block font-bold mb-3">ID Establecimiento *</label>
            <InputText
              id="establecimiento"
              v-model.trim="product.id_establecimiento_origen"
              required="true"
              :invalid="submitted && !product.id_establecimiento_origen"
              fluid
              placeholder="Por ejemplo: 2"
            />
            <small v-if="submitted && !product.id_establecimiento_origen" class="text-red-500"
              >El ID de establecimiento es requerido.</small
            >
          </div>

          <div>
            <label for="documentos" class="block font-bold mb-3">Documentos *</label>
            <FileUpload
              id="documentos"
              mode="basic"
              :multiple="true"
              accept=".pdf,.doc,.docx,.jpg,.png"
              :maxFileSize="5000000"
              chooseLabel="Agregar archivos"
              @select="onFileSelect"
              class="w-full"
            />
            <small class="text-gray-500"
              >Formatos permitidos: PDF, DOC, DOCX, JPG, PNG (máx. 5MB cada uno). Puedes seleccionar
              múltiples archivos.</small
            >
            <div
              v-if="selectedFiles.length === 0"
              class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700"
            >
              <i class="pi pi-info-circle mr-2"></i>
              Puedes agregar múltiples archivos. Cada vez que presiones "Agregar archivos" se
              sumarán a la lista.
            </div>
          </div>

          <div v-if="selectedFiles.length > 0">
            <div class="flex justify-between items-center mb-3">
              <label class="block font-bold"
                >Archivos seleccionados ({{ selectedFiles.length }})</label
              >
              <Button
                label="Limpiar todos"
                icon="pi pi-trash"
                size="small"
                severity="secondary"
                outlined
                @click="clearAllFiles"
              />
            </div>
            <div
              v-for="(file, index) in selectedFiles"
              :key="index"
              class="mb-4 p-3 border border-gray-200 rounded"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <i class="pi pi-file text-blue-500"></i>
                    <span class="text-sm font-medium">{{ file.name }}</span>
                    <small class="text-gray-500">({{ (file.size / 1024).toFixed(1) }} KB)</small>
                  </div>
                </div>
                <Button
                  icon="pi pi-times"
                  size="small"
                  severity="danger"
                  text
                  rounded
                  @click="removeFile(index)"
                  class="ml-2"
                />
              </div>
              <div>
                <label :for="`nombre_doc_${index}`" class="block text-sm mb-1 text-gray-700">
                  Nombre descriptivo:
                </label>
                <InputText
                  :id="`nombre_doc_${index}`"
                  v-model="documentNames[index]"
                  fluid
                  :placeholder="`Descripción para ${file.name}`"
                  class="text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
          <Button label="Guardar" icon="pi pi-check" @click="saveProduct" :loading="creating" />
        </template>
      </Dialog>

      <Dialog
        v-model:visible="deleteProductDialog"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
      >
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span v-if="product"
            >Are you sure you want to delete <b>{{ product.nombre }}</b
            >?</span
          >
        </div>
        <template #footer>
          <Button
            label="No"
            icon="pi pi-times"
            text
            @click="deleteProductDialog = false"
            severity="secondary"
            variant="text"
          />
          <Button label="Yes" icon="pi pi-check" @click="deleteProduct" severity="danger" />
        </template>
      </Dialog>

      <Dialog
        v-model:visible="deleteProductsDialog"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
      >
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span v-if="product">Are you sure you want to delete the selected products?</span>
        </div>
        <template #footer>
          <Button
            label="No"
            icon="pi pi-times"
            text
            @click="deleteProductsDialog = false"
            severity="secondary"
            variant="text"
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            text
            @click="deleteSelectedProducts"
            severity="danger"
          />
        </template>
      </Dialog>

      <!-- Toast para notificaciones -->
      <Toast />
    </NavBar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'
import { useProductos } from '../composables/indexMantProductos'
import { createProductos as useCreateProductos } from '../composables/createMantProductos'
import NavBar from '@/components/NavBar.vue'

import {
  DataTable,
  Column,
  Button,
  Dialog,
  InputText,
  FileUpload,
  Tag,
  IconField,
  InputIcon,
  Toast,
} from 'primevue'
import router from '@/routes'
import type { Product } from '../interfaces/createProductos'

// Usar los composables
const {
  productos,
  error,
  fetchProductos,
  paginationData,
  itemsPerPage,
  goToPage,
  changeItemsPerPage,
} = useProductos()
const { createProductos, creating } = useCreateProductos()

// Definir filtros antes del watcher
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

onMounted(() => {
  fetchProductos()
})

// Watcher para el filtro de búsqueda
watch(
  () => filters.value.global.value,
  (newValue) => {
    // Resetear a la primera página cuando se busca
    const filtroValue = newValue as string | null
    fetchProductos(1, itemsPerPage.value, filtroValue || undefined)
  },
)

// Manejar cambio de página
const onPageChange = (event: { page: number; rows: number }) => {
  const newPage = event.page + 1 // PrimeVue usa índice 0, la API usa índice 1
  const filtroActual = filters.value.global.value as string | null

  if (event.rows !== itemsPerPage.value) {
    changeItemsPerPage(event.rows, filtroActual || undefined)
  } else {
    goToPage(newPage, filtroActual || undefined)
  }
}

const toast = useToast()
const dt = ref()
const products = ref()
const productDialog = ref(false)
const deleteProductDialog = ref(false)
const deleteProductsDialog = ref(false)
const product = ref<Product>({})
const selectedProducts = ref()
const submitted = ref(false)
const selectedFiles = ref<File[]>([])
const documentNames = ref<string[]>([])

const openNew = () => {
  product.value = {}
  submitted.value = false
  productDialog.value = true
}

const hideDialog = () => {
  productDialog.value = false
  submitted.value = false
  selectedFiles.value = []
  documentNames.value = []
}

const onFileSelect = (event: { files: File[] }) => {
  const newFiles = Array.from(event.files)

  // Filtrar archivos duplicados basándose en nombre y tamaño
  const uniqueNewFiles = newFiles.filter(
    (newFile) =>
      !selectedFiles.value.some(
        (existingFile) => existingFile.name === newFile.name && existingFile.size === newFile.size,
      ),
  )

  // Agregar los nuevos archivos únicos a la lista existente
  selectedFiles.value = [...selectedFiles.value, ...uniqueNewFiles]

  // Agregar espacios para los nombres de los nuevos archivos
  const newNamesArray = new Array(uniqueNewFiles.length).fill('')
  documentNames.value = [...documentNames.value, ...newNamesArray]
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
  documentNames.value.splice(index, 1)
}

const clearAllFiles = () => {
  selectedFiles.value = []
  documentNames.value = []
}

const saveProduct = async () => {
  submitted.value = true

  if (
    product.value.nombre?.trim() &&
    product.value.codigo?.trim() &&
    product.value.id_categoria_producto?.trim() &&
    product.value.id_establecimiento_origen?.trim()
  ) {
    try {
      const formData = new FormData()
      formData.append('nombre', product.value.nombre)
      formData.append('codigo', product.value.codigo)
      formData.append('id_categoria_producto', product.value.id_categoria_producto)
      formData.append('id_establecimiento_origen', product.value.id_establecimiento_origen)

      // Agregar archivos si existen
      selectedFiles.value.forEach((file, index) => {
        formData.append(`documentos[${index}]`, file)
        // Solo agregar nombre si existe y no está vacío
        const nombreDoc = documentNames.value[index]?.trim()
        if (nombreDoc) {
          formData.append(`nombre_documento[${index}]`, nombreDoc)
        } else {
          // Si no hay nombre, usar el nombre del archivo sin extensión
          const nombrePorDefecto = file.name.split('.')[0]
          formData.append(`nombre_documento[${index}]`, nombrePorDefecto)
        }
      })

      const result = await createProductos(formData)
      if (result.success) {
        hideDialog()
        await fetchProductos() // Recargar la lista
      }
    } catch (error) {
      console.error('Error al crear producto:', error)
    }
  }
}
const editProduct = (prod: Product) => {
  product.value = { ...prod }
  productDialog.value = true
}
const confirmDeleteProduct = (prod: Product) => {
  product.value = prod
  deleteProductDialog.value = true
}
const deleteProduct = () => {
  products.value = products.value.filter((val: Product) => val.id !== product.value.id)
  deleteProductDialog.value = false
  product.value = {}
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 })
}

const deleteSelectedProducts = () => {
  products.value = products.value.filter((val: Product) => !selectedProducts.value.includes(val))
  deleteProductsDialog.value = false
  selectedProducts.value = null
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 })
}

const volver = () => {
  router.push('/indexMantenimiento')
}
</script>
