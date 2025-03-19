<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="layout" class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg">
      <div class="wrapper max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-wide">Backend Survivor</h1>
        <nav class="flex space-x-6">
          <RouterLink
            to="/"
            class="text-white hover:text-gray-200 font-medium transition duration-300"
            active-class="text-yellow-300 font-bold"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/about"
            class="text-white hover:text-gray-200 font-medium transition duration-300"
            active-class="text-yellow-300 font-bold"
          >
            About
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow bg-gray-100 py-8">
      <div class="max-w-7xl mx-auto px-4">
        <RouterView />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-400 text-center py-6">
      <p class="text-sm">
        © 2025 <span class="text-white font-semibold">Backend Survivor</span>. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<style scoped>
/* Custom styles for additional adjustments */
nav a {
  transition: color 0.3s ease;
}
</style>
