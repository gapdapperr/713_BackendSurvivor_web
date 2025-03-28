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
      throw new Error('Teacher ID not found')
    }

    isLoading.value = true
    const response = await StudentService.getStudentByTeacherId(id)

    // Check if response is empty
    if (!response.data || response.data.length === 0) {
      router.push({
        name: '404-resource-view',
        params: { resource: 'students' },
      })
      return
    }

    students.value = response.data
  } catch (error) {
    console.error('Error fetching students:', error)
    if (error.response?.status === 404) {
      router.push({
        name: '404-resource-view',
        params: { resource: 'students' },
      })
    } else {
      router.push({ name: 'network-error-view' })
    }
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
