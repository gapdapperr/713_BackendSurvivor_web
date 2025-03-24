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
}
  )
</script>

<template>
  <p>Teacher Management</p>

  <AddTeacherModal :onRefresh="fetchTeachers" />

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

  <TeacherTable :teachers="teachers" :onRefresh="fetchTeachers" />

  <Pagination
    :currentPage="page"
    :totalItems="totalTeachers"
    :pageSize="pageSize"
    routeName="admin-teachers-view"
  />
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
