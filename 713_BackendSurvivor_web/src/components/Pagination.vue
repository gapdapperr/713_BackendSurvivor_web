<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
interface Props {
  currentPage: number
  totalItems: number
  pageSize: number
  routeName: string
  keyword?: string
}

const props = defineProps<Props>()

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))
const hasNextPage = computed(() => props.currentPage < totalPages.value)

// คำนวณหน้าที่จะแสดง
const visiblePageNumbers = computed(() => {
  const currentPage = props.currentPage
  const total = totalPages.value
  const delta = 2 // จำนวนปุ่มที่จะแสดงข้างๆ หน้าปัจจุบัน

  let pages: (number | string)[] = []

  const range = {
    start: Math.max(1, currentPage - delta),
    end: Math.min(total, currentPage + delta),
  }

  if (range.start > 1) {
    pages.push(1)
    if (range.start > 2) pages.push('...')
  }

  for (let i = range.start; i <= range.end; i++) {
    pages.push(i)
  }

  if (range.end < total) {
    if (range.end < total - 1) pages.push('...')
    pages.push(total)
  }

  return pages
})
</script>

<template>
  <div
    class="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <!-- Mobile pagination -->
    <div class="flex flex-1 justify-between sm:hidden">
      <RouterLink
        v-if="currentPage !== 1"
        :to="{ name: routeName, query: { page: currentPage - 1, keyword } }"
        class="relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      >
        ก่อนหน้า
      </RouterLink>
      <RouterLink
        v-if="hasNextPage"
        :to="{ name: routeName, query: { page: currentPage + 1, keyword } }"
        class="relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      >
        ถัดไป
      </RouterLink>
    </div>

    <!-- Desktop pagination -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          แสดง
          <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
          ถึง
          <span class="font-medium">{{ Math.min(currentPage * pageSize, totalItems) }}</span>
          จากทั้งหมด
          <span class="font-medium">{{ totalItems }}</span>
          รายการ
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <!-- Previous page button -->
          <RouterLink
            v-if="currentPage !== 1"
            :to="{ name: routeName, query: { page: currentPage - 1, keyword } }"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
            <span
              v-if="pageNum === '...'"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700"
            >
              ...
            </span>
            <RouterLink
              v-else
              :to="{ name: routeName, query: { page: pageNum, keyword } }"
              :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold',
                pageNum === currentPage
                  ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0',
              ]"
            >
              {{ pageNum }}
            </RouterLink>
          </template>

          <!-- Next page button -->
          <RouterLink
            v-if="hasNextPage"
            :to="{ name: routeName, query: { page: currentPage + 1, keyword } }"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
</template>
