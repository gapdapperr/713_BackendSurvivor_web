<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiLogin } from '@mdi/js'
import UserMenu from './UserMenu.vue'

const authStore = useAuthStore()
</script>

<template>
  <header class="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg">
    <div class="wrapper max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold tracking-wide">Student Advisor Management</h1>

      <!-- Guest Navigation -->
      <nav v-if="!authStore.isAuthenticated" class="flex items-center space-x-6">
        <RouterLink
          to="/"
          class="text-white hover:text-gray-200 font-medium transition duration-300"
        >
          หน้าแรก
        </RouterLink>
        <RouterLink
          to="/login"
          class="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          <SvgIcon type="mdi" :path="mdiLogin" size="20" />
          เข้าสู่ระบบ
        </RouterLink>
      </nav>

      <!-- Authenticated Navigation -->
      <UserMenu v-else />
    </div>
  </header>
</template>
