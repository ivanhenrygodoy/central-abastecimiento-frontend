<template>
  <div class="mantenimientos-index">
    <!-- Navbar general con contenido como slot -->
    <NavBar title="Mantenimientos">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          ¡Bienvenido! Has iniciado sesión correctamente.
        </div>

        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Dashboard de Mantenimientos</h2>
          <!-- Enlaces de navegación -->
          <div class="text-left mt-6 space-y-4">
            <div>
              <router-link
                to="/productos"
                class="block w-64 hover:opacity-80 transition-all duration-300 relative hover:scale-95 transform"
              >
                <img
                  src="/src/assets/img/mantenimiento-productos.jpg"
                  alt="Gestión de Productos"
                  class="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                />
                <div
                  class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-3 rounded-b-lg"
                >
                  <h3 class="text-sm font-semibold">Mantenimiento de Productos</h3>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/auth/composables/useAuth'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()
const { isAuthenticated } = useAuth()

// Verificar autenticación al montar el componente
onMounted(() => {
  if (!isAuthenticated()) {
    // Redirigir al login si no está autenticado
    router.push('/login')
    return
  }
})
</script>

<style scoped>
.mantenimientos-index {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>
