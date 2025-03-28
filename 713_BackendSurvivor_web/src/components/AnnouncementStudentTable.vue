<script setup lang="ts">
import type { Announcement } from '@/types';
import AnnouncementModal from './AnnouncementModal.vue';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';


const props = defineProps<{
  announcements: Announcement[]
}>()

const formatDate = (date: string | null) => {
  if (!date) return '-'
  return format(new Date(date), 'PPp', { locale: th })
}
</script>

<template>
  <!-- Main container with shadow and rounded corners -->
  <div class="bg-white rounded-lg shadow-lg border border-gray-200">
    <!-- Table wrapper with overflow handling -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Table header -->
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ชื่อ
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              รายละเอียด
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              วันที่เผยแพร่
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            </th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="announcement in announcements"
              :key="announcement.id"
              class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ announcement.title }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ announcement.content }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(announcement.createdAt) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <AnnouncementModal :announcement="announcement" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
