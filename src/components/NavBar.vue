<template>
  <div>
    <!-- Botón hamburguesa fijo en esquina superior izquierda -->
    <button
      @click="toggleSidebar"
      :class="[
        'fixed top-4 left-4 z-[70] w-10 h-10 flex items-center justify-center transition-colors duration-200',
        sidebarVisible ? 'text-white hover:text-gray-200' : 'text-gray-700 hover:text-gray-900',
      ]"
      aria-label="Toggle sidebar"
    >
      <i class="pi pi-bars text-xl"></i>
    </button>

    <!-- Navbar fijo -->
    <nav 
      :class="[
        'bg-white shadow-sm border-b border-gray-200 fixed top-0 z-[50] transition-all duration-700 ease-in-out',
        sidebarVisible ? 'lg:left-64 lg:w-[calc(100%-16rem)]' : 'left-0 w-full'
      ]"
    >
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Espaciador izquierdo para el botón hamburguesa -->
          <div class="w-12 flex-shrink-0"></div>

          <!-- Logo/Título centrado -->
          <div class="flex-1 flex justify-center min-w-0">
            <h1
              class="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 truncate px-2 text-center"
            >
              {{ title || 'Sistema de Gestión' }}
            </h1>
          </div>

          <!-- Botones derecha -->
          <div class="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <!-- Botón Perfil - Solo icono en móvil, con texto en desktop -->
            <Button
              :label="''"
              icon="pi pi-user"
              outlined
              @click="handleProfile"
              class="p-button-sm p-2 sm:px-3 text-xs sm:text-sm"
              title="Perfil"
            />

            <!-- Botón Cerrar Sesión - Solo icono en móvil, con texto en desktop -->
            <Button
              :label="''"
              icon="pi pi-sign-out"
              severity="danger"
              @click="handleLogout"
              class="p-button-sm p-2 sm:px-3 text-xs sm:text-sm"
              title="Cerrar Sesión"
            />
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <Sidebar :visible="sidebarVisible" @close="closeSidebar" @logout="handleLogout" />

    <!-- Contenido con padding-top para compensar el navbar fijo y margen lateral para el sidebar -->
    <div 
      :class="[
        'pt-16 transition-all duration-700 ease-in-out',
        sidebarVisible ? 'lg:ml-64' : 'ml-0'
      ]"
    >
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/auth/composables/useAuth'
import Button from 'primevue/button'
import Sidebar from './Sidebar.vue'

interface Props {
  title?: string
}

// Props del componente
defineProps<Props>()

const router = useRouter()
const { logout } = useAuth()

// Estado del sidebar
const sidebarVisible = ref(false)

// Funciones del sidebar
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

const closeSidebar = () => {
  sidebarVisible.value = false
}

const handleLogout = async () => {
  // Cerrar sidebar
  sidebarVisible.value = false

  try {
    await logout()
    // El logout ya maneja la redirección al login
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    // En caso de error, forzar redirección al login
    router.push('/login')
  }
}

const handleProfile = () => {
  // Por ahora solo un placeholder
  console.log('Perfil clicked - función pendiente de implementar')
}
</script>

<style scoped>
/* Estilos adicionales si los necesitas */
</style>
