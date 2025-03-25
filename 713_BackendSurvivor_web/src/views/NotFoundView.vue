<script setup lang="ts">
import { withDefaults } from 'vue'

withDefaults(
  defineProps<{
    resource: string
  }>(),
  {
    resource: 'page',
  },
)
</script>

<template>
  <div class="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
    <div class="max-w-md space-y-6">
      <!-- 404 Icon -->
      <div class="text-indigo-500">
        <svg class="mx-auto h-24 w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Error Messages -->
      <div class="space-y-3">
        <h1 class="text-4xl font-bold text-gray-900">404 - ไม่พบหน้าที่คุณต้องการ</h1>
        <h3 class="text-lg text-gray-600">ไม่พบ {{ resource }} ที่คุณกำลังค้นหา</h3>
      </div>

      <!-- Back Link -->
      <div class="pt-6">
        <router-link
          :to="{ name: 'login' }"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          กลับไปหน้าหลัก
        </router-link>
      </div>
    </div>
  </div>
</template>
