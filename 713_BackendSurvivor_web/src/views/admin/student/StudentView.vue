<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import StudentTable from '@/components/StudentTable.vue'
import StudentService from '@/services/StudentService'
import type { Student } from '@/types'
import { useRouter } from 'vue-router'

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
const totalPages = computed(() => Math.ceil(totalStudents.value / pageSize))
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalStudents.value / pageSize)
  return page.value < totalPages
})

// เพิ่ม computed property สำหรับจำกัดจำนวนปุ่มหน้า
const visiblePageNumbers = computed(() => {
  const currentPage = page.value
  const total = totalPages.value
  const delta = 2 // จำนวนปุ่มที่จะแสดงข้างๆ หน้าปัจจุบัน

  // สร้าง array เก็บหมายเลขหน้าที่จะแสดง
  let pages: (number | string)[] = []

  // คำนวณช่วงหน้าที่จะแสดง
  const range = {
    start: Math.max(1, currentPage - delta),
    end: Math.min(total, currentPage + delta),
  }

  // เพิ่มปุ่มหน้าแรกและจุดไข่ปลา
  if (range.start > 1) {
    pages.push(1)
    if (range.start > 2) pages.push('...')
  }

  // เพิ่มปุ่มหน้าในช่วงที่คำนวณ
  for (let i = range.start; i <= range.end; i++) {
    pages.push(i)
  }

  // เพิ่มปุ่มหน้าสุดท้ายและจุดไข่ปลา
  if (range.end < total) {
    if (range.end < total - 1) pages.push('...')
    pages.push(total)
  }

  return pages
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
    <!-- Pagination Controls -->
    <div
      class="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <!-- Mobile pagination controls -->
      <div class="flex flex-1 justify-between sm:hidden">
        <RouterLink
          :to="{ name: 'admin-students', query: { page: page - 1, keyword } }"
          :class="[
            'relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium',
            page !== 1
              ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              : 'border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed',
          ]"
          :aria-disabled="page === 1"
          v-if="page !== 1"
        >
          ก่อนหน้า
        </RouterLink>
        <RouterLink
          :to="{ name: 'admin-students', query: { page: page + 1, keyword } }"
          :class="[
            'relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium',
            hasNextPage
              ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              : 'border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed',
          ]"
          :aria-disabled="!hasNextPage"
          v-if="hasNextPage"
        >
          ถัดไป
        </RouterLink>
      </div>

      <!-- Desktop pagination controls -->
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            แสดง
            <span class="font-medium">{{ (page - 1) * pageSize + 1 }}</span>
            ถึง
            <span class="font-medium">{{ Math.min(page * pageSize, totalStudents) }}</span>
            จากทั้งหมด
            <span class="font-medium">{{ totalStudents }}</span>
            รายการ
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <!-- Previous page button -->
            <RouterLink
              :to="{ name: 'admin-students', query: { page: page - 1, keyword } }"
              :class="[
                'relative inline-flex items-center rounded-l-md px-2 py-2',
                page !== 1
                  ? 'text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  : 'text-gray-300 cursor-not-allowed',
              ]"
              :aria-disabled="page === 1"
              v-if="page !== 1"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </RouterLink>

            <!-- Page numbers -->
            <template v-for="pageNum in visiblePageNumbers" :key="pageNum">
              <!-- จุดไข่ปลา -->
              <span
                v-if="pageNum === '...'"
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700"
              >
                ...
              </span>
              <!-- ปุ่มตัวเลข -->
              <RouterLink
                v-else
                :to="{ name: 'admin-students', query: { page: pageNum, keyword } }"
                :class="[
                  'relative inline-flex items-center px-4 py-2 text-sm font-semibold',
                  pageNum === page
                    ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0',
                ]"
              >
                {{ pageNum }}
              </RouterLink>
            </template>

            <!-- Next page button -->
            <RouterLink
              :to="{ name: 'admin-students', query: { page: page + 1, keyword } }"
              :class="[
                'relative inline-flex items-center rounded-r-md px-2 py-2',
                hasNextPage
                  ? 'text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  : 'text-gray-300 cursor-not-allowed',
              ]"
              :aria-disabled="!hasNextPage"
              v-if="hasNextPage"
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
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
