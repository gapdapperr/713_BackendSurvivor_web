<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import StudentTable from '@/components/StudentTable.vue'
import StudentService from '@/services/StudentService'
import type { Student } from '@/types'
import { useRouter } from 'vue-router'
import Pagination from '@/components/Pagination.vue'

interface Props {
  page: number
}

const router = useRouter()
const students = ref<Student[]>([])
const totalStudents = ref(0)
const props = defineProps<Props>()
const page = computed(() => props.page)
const keyword = ref('')
const isLoading = ref(false)

const pageSize = 10
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalStudents.value / pageSize)
  return page.value < totalPages
})

const fetchStudents = async () => {
  try {
    isLoading.value = true
    const response = await StudentService.getStudents(page.value, pageSize, keyword.value)
    students.value = response.data
    totalStudents.value = response.headers['x-total-count']
  } catch (error) {
    router.push({ name: 'network-error-view' })
  } finally {
    isLoading.value = false
  }
}

// Function to handle search
async function handleSearch() {
  isLoading.value = true
  StudentService.getStudents(1, pageSize, keyword.value)
    .then((response) => {
      students.value = response.data
      totalStudents.value = response.headers['x-total-count']
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
    .finally(() => {
      isLoading.value = false
    })
}

watchEffect(() => {
  isLoading.value = true
  StudentService.getStudents(page.value, pageSize, '')
    .then((response) => {
      students.value = response.data
      totalStudents.value = response.headers['x-total-count']
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<template>
  <div class="dashboard p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">จัดการข้อมูลนักศึกษา</h2>

    <!-- Search Section -->
    <div class="mb-6 flex gap-4">
      <div class="flex-grow">
        <input
          type="text"
          v-model="keyword"
          placeholder="ค้นหานักศึกษา...(Student ID, ชื่อ, นามสกุล)"
          class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="handleSearch"
        />
      </div>
      <button
        @click="handleSearch"
        :disabled="isLoading"
        class="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        <span v-if="!isLoading">ค้นหา</span>
        <span v-else>กำลังค้นหา...</span>
      </button>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="space-y-4">
      <div v-for="n in 3" :key="n" class="bg-white rounded-lg shadow-sm p-4 animate-pulse">
        <div class="flex items-center space-x-4">
          <div class="h-12 w-12 bg-gray-200 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div class="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Student Table -->
    <StudentTable v-else :students="students" :onRefresh="fetchStudents" />

    <!-- Pagination -->
    <Pagination
      :currentPage="page"
      :totalItems="totalStudents"
      :pageSize="pageSize"
      routeName="admin-students"
      :keyword="keyword"
    />
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
