<script setup lang="ts">
import AnnouncementTable from '@/components/AnnouncementStudentTable.vue'
import AnnouncementService from '@/services/AnnouncementService'
import teacherService from '@/services/teacherService'
import type { Announcement } from '@/types'
import { onMounted, ref } from 'vue'

const announcements = ref<Announcement[]>([])
const isLoading = ref(false)

async function fetchAnnouncements() {
  try {
    isLoading.value = true
    const teacher = await teacherService.getMyTeacher()
    const response = await AnnouncementService.getAnnouncementsForStudent(teacher.data.id)
    announcements.value = response.data
  } catch (error) {
    console.error('Error fetching announcements:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchAnnouncements()
})
</script>

<template>
  <div class="dashboard p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">ประกาศจากอาจารย์ที่ปรึกษา</h2>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"
      ></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="announcements.length === 0" class="text-center py-12">
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
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">ไม่พบข้อมูลประกาศ</h3>
      <p class="mt-2 text-sm text-gray-500">ยังไม่มีประกาศจากอาจารย์ที่ปรึกษาในขณะนี้</p>
    </div>

    <!-- Table Container -->
    <div v-else class="bg-white rounded-lg shadow-lg overflow-hidden">
      <AnnouncementTable :announcements="announcements" />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: calc(100vh - 64px);
}
</style>
