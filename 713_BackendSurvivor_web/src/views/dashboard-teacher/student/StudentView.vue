<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import StudentCard from '@/components/StudentCard.vue'
import StudentService from '@/services/StudentService'
import type { Student } from '@/types'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const router = useRouter()
const students = ref<Student[]>([])
const isLoading = ref(false)

const teacherId = computed(() => authStore.user?.teacher?.id)

const fetchStudents = async () => {
  try {
    const id = teacherId.value
    if (!id) {
      router.push({ name: 'unauthorized' })
      return
    }

    isLoading.value = true
    const response = await StudentService.getStudentByTeacherId(id).catch(() => ({ data: [] })) // Silently handle 404 by returning empty array

    if (!response.data || response.data.length === 0) {
      students.value = []
      return // Stay on page but show empty state
    }

    students.value = response.data
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  if (!teacherId.value) {
    router.push({ name: 'unauthorized' })
    return
  }
  await fetchStudents()
})
</script>

<template>
  <div class="dashboard p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">รายการนักศึกษา</h2>

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
    <div v-else-if="students.length === 0" class="text-center py-12">
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
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">ไม่พบข้อมูลนักศึกษา</h3>
      <p class="mt-2 text-sm text-gray-500">ยังไม่มีนักศึกษาที่อยู่ในความดูแลของคุณ</p>
    </div>

    <!-- Student Cards Grid -->
    <div v-else class="grid gap-4 max-w-4xl mx-auto">
      <StudentCard v-for="student in students" :key="student.id" :student="student" />
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
