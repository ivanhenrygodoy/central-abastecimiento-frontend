<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Gremial Abastecimiento</h1>

    <!-- Mostrar error si existe -->
    <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
      {{ error }}
    </div>

    <form @submit.prevent="handleLogin" class="space-y-6">
      <!-- Email Input -->
      <div>
        <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
        <InputText
          type="text"
          id="email"
          name="email"
          unstyled
          :class="[
            'w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-200',
            formErrors.email
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
            'bg-white text-gray-800 placeholder-gray-400',
          ]"
          placeholder="Ingresa tu email"
          autocomplete="email"
          v-model="credentials.email"
        />
        <p v-if="formErrors.email" class="text-red-600 text-sm mt-1">{{ formErrors.email }}</p>
      </div>

      <!-- Password Input -->
      <div>
        <label for="password" class="block text-gray-700 font-medium mb-2 mb-2">Contraseña</label>
        <InputText
          type="password"
          id="password"
          name="password"
          unstyled
          :class="[
            'w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-200',
            formErrors.password
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
            'bg-white text-gray-800 placeholder-gray-400',
          ]"
          placeholder="Ingresa tu contraseña"
          autocomplete="current-password"
          v-model="credentials.password"
        />
        <p v-if="formErrors.password" class="text-red-600 text-sm mt-1">
          {{ formErrors.password }}
        </p>
      </div>

      <!-- Login Button -->
      <Button
        label="Iniciar Sesión"
        type="submit"
        unstyled
        :class="[
          'w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform',
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl',
        ]"
        :disabled="isLoading"
      />

      <div v-if="isLoading" class="text-center mt-2">
        <span class="text-gray-600 text-sm">Iniciando sesión...</span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useAuth } from '../composables/useAuth'
import { ref, watch } from 'vue'

const { login, isLoading, error } = useAuth()

const credentials = ref({
  email: '',
  password: '',
})
const formErrors = ref<{ email?: string; password?: string }>({})

// Limpiar errores al escribir
watch(
  () => credentials.value.email,
  (newVal) => {
    if (newVal) formErrors.value.email = ''
  },
)

watch(
  () => credentials.value.password,
  (newVal) => {
    if (newVal) formErrors.value.password = ''
  },
)

// Función para manejar el submit del formulario
const handleLogin = async () => {
  // Limpiar errores previos
  formErrors.value.email = ''
  formErrors.value.password = ''

  let valid = true

  if (!credentials.value.email) {
    formErrors.value.email = 'El campo email es obligatorio'
    valid = false
  }

  if (!credentials.value.password) {
    formErrors.value.password = 'El campo password es obligatorio'
    valid = false
  }

  if (!valid) return
  try {
    await login(credentials.value)
    // La redirección se maneja automáticamente en el composable
  } catch (err) {
    // El error se maneja automáticamente en el composable
    console.error('Error en login:', err)
  }
}
</script>
