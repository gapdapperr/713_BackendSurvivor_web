<script setup lang="ts">
import AnnouncementModal from './AnnouncementModal.vue'
import type { Announcement } from '@/types'

// const announcements = ref()

const props = defineProps<{
  announcements: Announcement[]
}>()

function formatDate(utcDate: string): string {
  const date = new Date(utcDate)
  return date.toLocaleString() // Converts UTC to local time
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ชื่อ</th>
        <th>รายละเอียด</th>
        <th>วันที่เผยแพร่</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="announcement in announcements" :key="announcement.id">
        <td>{{ announcement.title }}</td>
        <td>{{ announcement.content }}</td>
        <td>{{ formatDate(announcement.createdAt) }}</td>
        <td><AnnouncementModal :announcement="announcement" /></td>
      </tr>
    </tbody>
  </table>
</template>
