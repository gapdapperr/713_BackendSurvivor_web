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
  <h1>ประกาศจากอาจารย์ที่ปรึกษา</h1>
  <AnnouncementTable :announcements="announcements" />
</template>
