<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Announcement } from '@/types'
import AnnouncementTable from '@/components/AnnouncementTable.vue'
import AnnouncementService from '@/services/AnnouncementService'
import teacherService from '@/services/teacherService'

const announcements = ref<Announcement[]>([])

async function fetchAnnouncements() {
  try {
    const teacher = await teacherService.getMyTeacher()
    const response = await AnnouncementService.getAnnouncementsForStudent(teacher.data.id)
    announcements.value = response.data
  } catch (error) {
    console.error('Error fetching announcements:', error)
  }
}

onMounted(() => {
  fetchAnnouncements()
})
</script>

<template>
  <div class="dashboard p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">ประกาศจากอาจารย์ที่ปรึกษา</h2>

    <!-- Table Container -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <AnnouncementTable :announcements="announcements" />
    </div>
  </div>
</template>


<style scoped>
.dashboard {
  min-height: calc(100vh - 64px);
}
</style>
