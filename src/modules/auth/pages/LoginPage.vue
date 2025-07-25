<template>
  <h1 class="text-2xl font-bold text-blue-500 mb-11 text-center">Gremial Abastecimiento</h1>
  <!-- Mostrar error si existe -->
  <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
    {{ error }}
  </div>
  <form @submit.prevent="handleLogin">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <InputText
        type="text"
        id="email"
        name="email"
        unstyled
        :class="[
          'w-full border bg-white border-gray-300 rounded-md py-2 px-3 focus:outline-none',
          formErrors.email
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-blue-500',
          'bg-white text-black',
        ]"
        autocomplete="off"
        v-model="credentials.email"
      />
      <p v-if="formErrors.email" class="text-red-600 text-sm mt-1">{{ formErrors.email }}</p>
    </div>
    <!-- Password Input -->
    <div class="mb-11">
      <label for="password" class="block text-gray-600">Password</label>
      <InputText
        type="password"
        id="password"
        name="password"
        unstyled
        :class="[
          'w-full border bg-white border-gray-300 rounded-md py-2 px-3 focus:outline-none',
          formErrors.password
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-blue-500',
          'bg-white text-black',
        ]"
        autocomplete="off"
        v-model="credentials.password"
      />
      <p v-if="formErrors.password" class="text-red-600 text-sm mt-1">{{ formErrors.password }}</p>
    </div>
    <!-- Remember Me Checkbox 
    <div class="mb-4 flex items-center">
      <Checkbox id="remember" name="remember" unstyled class="bg-white text-blue-500" />
      <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
    </div> -->
    <!-- Forgot Password Link 
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div> --->

    <!-- Login Button -->
    <Button
      label="Login"
      type="submit"
      unstyled
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="isLoading"
    />
    <span v-if="isLoading">Logging in...</span>
    <!-- <span v-else>Login</span> -->
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <!-- <RouterLink :to="{ name: 'register' }" class="hover:underline">Sign up Here</RouterLink> -->
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
