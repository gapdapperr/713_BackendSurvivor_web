<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="flex min-h-[50vh] flex-col items-center justify-center text-center p-8">
    <div class="max-w-md space-y-6">
      <!-- Error Icon -->
      <div class="text-red-500">
        <svg class="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 class="text-3xl font-bold text-gray-900">เกิดข้อผิดพลาดในการเชื่อมต่อ</h1>

      <p class="text-lg text-gray-600">
        ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
        <button @click="goBack" class="text-indigo-600 hover:text-indigo-500 font-medium ml-1">
          ลองอีกครั้ง
        </button>
      </p>
    </div>
  </div>
</template>
