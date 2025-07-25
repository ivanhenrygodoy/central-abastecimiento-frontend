<template>
  <!-- Wrapper siempre presente para transiciones -->
  <div
    :class="[
      'fixed inset-0 z-[55] transition-all duration-700 ease-in-out pointer-events-none',
      visible ? 'opacity-100 pointer-events-auto' : 'opacity-0',
    ]"
    @click="handleOverlayClick"
  >
    <!-- Sidebar -->
    <div
      :class="[
        'fixed top-0 left-0 h-full w-64 transform transition-all duration-700 ease-in-out',
        visible ? 'translate-x-0' : '-translate-x-full',
        'bg-cover bg-center bg-no-repeat relative overflow-hidden shadow-2xl',
      ]"
      :style="{
        backgroundImage: `url(${backgroundImage})`,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      }"
      @click.stop
    >
      <!-- Overlay para mejor legibilidad del texto -->
      <div class="absolute inset-0 bg-black bg-opacity-60"></div>

      <!-- Contenido del sidebar -->
      <div class="relative z-10 p-4 h-full">
        <!-- Header del sidebar -->
        <div class="flex items-center justify-between mb-6"></div>

        <!-- Enlaces de navegación -->
        <ul class="space-y-3 pt-6">
          <li>
            <RouterLink
              to="/indexMantenimiento"
              class="flex items-center text-white hover:text-blue-300 hover:bg-white hover:bg-opacity-10 py-3 px-3 rounded transition-all duration-200"
              @click="handleNavigation"
            >
              <i class="pi pi-home mr-3 text-lg"></i>
              <span>Dashboard</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/productos"
              class="flex items-center text-white hover:text-blue-300 hover:bg-white hover:bg-opacity-10 py-3 px-3 rounded transition-all duration-200"
              @click="handleNavigation"
            >
              <i class="pi pi-box mr-3 text-lg"></i>
              <span>Productos</span>
            </RouterLink>
          </li>

          <!-- Separador -->
          <li class="border-t border-white border-opacity-30 my-4"></li>

          <li>
            <RouterLink
              to="/perfil"
              class="flex items-center text-white hover:text-blue-300 hover:bg-white hover:bg-opacity-10 py-3 px-3 rounded transition-all duration-200"
              @click="handleNavigation"
            >
              <i class="pi pi-user mr-3 text-lg"></i>
              <span>Perfil</span>
            </RouterLink>
          </li>
          <li>
            <a
              @click="$emit('logout')"
              class="flex items-center text-red-300 hover:text-red-100 hover:bg-red-600 hover:bg-opacity-20 cursor-pointer py-3 px-3 rounded transition-all duration-200"
            >
              <i class="pi pi-sign-out mr-3 text-lg"></i>
              <span>Cerrar sesión</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'CentralSidebar' })
import backgroundImage from '@/assets/img/image-central-login.jpg'

interface Props {
  visible: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'logout'): void
}>()

const handleOverlayClick = (event: Event) => {
  // Solo cerrar si se hace clic en el overlay (no en el sidebar) y si está visible
  if (event.target === event.currentTarget && props.visible) {
    emit('close')
  }
}

const handleNavigation = () => {
  // Cerrar sidebar después de navegar en todas las pantallas
  emit('close')
}
</script>

<style scoped>
/* Asegurar que la imagen cubra todo el espacio */
.bg-cover {
  background-size: cover !important;
}

/* Efectos de hover para los iconos */
.group:hover i {
  color: rgb(147 197 253);
}

/* Transiciones para elementos específicos */
.transition-all {
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Transiciones para enlaces */
a,
button {
  transition: all 0.3s ease-out;
}
</style>
