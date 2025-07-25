<template>
  <!-- component -->
  <div class="relative min-h-screen flex justify-center items-center">
    <!-- Background Image -->
    <div
      class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <!-- Overlay for better text readability -->
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>

    <!-- Login Form Container -->
    <div class="relative z-10 w-full max-w-lg mx-auto p-8">
      <!-- Login Form Card -->
      <div class="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl px-10 py-16">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import backgroundImage from '@/assets/img/image-central-login.jpg'
</script>
