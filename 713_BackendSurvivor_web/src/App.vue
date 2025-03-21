<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div id="layout" class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />

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
