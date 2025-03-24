<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import BackButton from '@/components/BackButton.vue'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types'

const authStore = useAuthStore()

onMounted(() => {
  // Restore authentication state from localStorage
  const token = localStorage.getItem('access_token')
  const userStr = localStorage.getItem('user')

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr) as User
      authStore.reload(token, user)
    } catch (error) {
      console.error('Failed to restore auth state:', error)
      // Clear invalid data
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    }
  }
})
</script>

<template>
  <div id="layout" class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
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
