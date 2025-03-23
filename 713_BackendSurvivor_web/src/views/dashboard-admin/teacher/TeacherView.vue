<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TeacherTable from '@/components/TeacherTable.vue'
import AddTeacherModal from '@/components/AddTeacherModal.vue'
import TeacherService from '@/services/teacherService'
import Pagination from '@/components/Pagination.vue'

const teachers = ref([])
const totalTeachers = ref(0)
const currentPage = ref(1)
const pageSize = 10
const isLoading = ref(false)

const route = useRoute()
const router = useRouter()

// Fetch teachers from the API
const fetchTeachers = async () => {
  try {
    console.log('Fetching teachers for page:', currentPage.value)
    isLoading.value = true
    const response = await TeacherService.getAllTeachers(currentPage.value, pageSize)
    teachers.value = response.data
    totalTeachers.value = parseInt(response.headers['x-total-count'], 10) || 0
  } catch (error) {
    console.error('Error fetching teachers:', error)
  } finally {
    isLoading.value = false
  }
}

// Watch the route query for page changes
watchEffect(() => {
  const page = parseInt(route.query.page as string) || 1
  if (currentPage.value !== page) {
    currentPage.value = page
  }
  console.log('Current Page:', currentPage.value)
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

    <!-- Teacher Table -->
    <TeacherTable v-else :teachers="teachers" :onRefresh="fetchTeachers" />

    <!-- Pagination -->
    <Pagination
      :currentPage="currentPage"
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
