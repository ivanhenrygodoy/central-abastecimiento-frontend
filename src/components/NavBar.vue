<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Título izquierda -->
        <div class="flex items-center">
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
            class="p-button-sm"
          />

          <!-- Botón Cerrar Sesión -->
          <Button
            label="Cerrar Sesión"
            icon="pi pi-sign-out"
            severity="danger"
            @click="handleLogout"
            class="p-button-sm"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/auth/composables/useAuth'
import Button from 'primevue/button'

interface Props {
  title?: string
}

// Props del componente
defineProps<Props>()

const router = useRouter()
const { logout } = useAuth()

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
