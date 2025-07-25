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
    <nav class="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-[50]">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Título centrado -->
          <div class="flex-1 flex justify-center">
            <h1 class="text-xl font-semibold text-gray-900">{{ title || 'Sistema de Gestión' }}</h1>
          </div>

          <!-- Botones derecha -->
          <div class="flex items-center space-x-3">
            <!-- Botón Perfil -->
            <Button
              label="Perfil"
              icon="pi pi-user"
              outlined
              @click="handleProfile"
              class="p-button-sm hidden sm:flex"
            />

            <!-- Botón Cerrar Sesión -->
            <Button
              label="Cerrar Sesión"
              icon="pi pi-sign-out"
              severity="danger"
              @click="handleLogout"
              class="p-button-sm hidden sm:flex"
            />
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <Sidebar :visible="sidebarVisible" @close="closeSidebar" @logout="handleLogout" />

    <!-- Contenido con padding-top para compensar el navbar fijo -->
    <div class="pt-16">
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
