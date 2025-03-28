<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import TeacherTable from '@/components/TeacherTable.vue'
import teacherService from '@/services/teacherService'
import Pagination from '@/components/Pagination.vue'
import AddTeacherModal from '@/components/AddTeacherModal.vue'
import type { Teacher } from '@/types'

interface Props {
  page: number
}

const router = useRouter()
const pageSize = 10
const totalTeachers = ref(0)
const teachers = ref<Teacher[]>([])
const props = defineProps<Props>()
const page = computed(() => props.page)
const isLoading = ref(false)

async function fetchTeachers() {
  try {
    isLoading.value = true
    const response = await teacherService.getAllTeachers(page.value, pageSize)
    teachers.value = response.data
    totalTeachers.value = parseInt(response.headers['x-total-count'])
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  fetchTeachers()
})
</script>

<template>
  <div class="dashboard p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">จัดการข้อมูลอาจารย์</h2>

    <!-- Add Teacher Modal -->
    <div class="mb-6">
      <AddTeacherModal :onRefresh="fetchTeachers" />
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

    <!-- Empty State -->
    <div v-else-if="teachers.length === 0" class="text-center py-12">
      <svg
        class="mx-auto h-16 w-16 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">ไม่พบข้อมูลอาจารย์</h3>
      <p class="mt-2 text-sm text-gray-500">ยังไม่มีข้อมูลอาจารย์ในระบบ กรุณาเพิ่มข้อมูลอาจารย์</p>
    </div>

    <!-- Teacher Table -->
    <TeacherTable v-else :teachers="teachers" :onRefresh="fetchTeachers" />

    <!-- Pagination -->
    <Pagination
      :currentPage="page"
      :totalItems="totalTeachers"
      :pageSize="pageSize"
      routeName="admin-teachers-view"
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
