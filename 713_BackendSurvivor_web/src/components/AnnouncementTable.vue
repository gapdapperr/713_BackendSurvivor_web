<script setup lang="ts">
import type { Announcement } from '@/types';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

const props = defineProps<{
  announcements: Announcement[]
}>()

const emit = defineEmits<{
  (e: 'preview', fileUrl: string): void
  (e: 'download', fileUrl: string): void
}>()

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }
    return format(date, 'PPp', { locale: th })
  } catch (error) {
    return '-'
  }
}

const getFileName = (url: string) => {
  const segments = url.split('/')
  return segments[segments.length - 1]
}

const isPreviewable = (url: string): boolean => {
  const ext = url.split('.').pop()?.toLowerCase()
  return [
    'pdf',
    'txt',
    'doc',
    'docx',
    'jpg',
    'jpeg',
    'png',
    'gif',
    'webp',
    'mp3',
    'wav',
    'mp4',
    'webm',
  ].includes(ext || '')
}
</script>

<template>
  <div class="bg-white mt-3 shadow-sm rounded-lg overflow-hidden border border-gray-200">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            หัวข้อ
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            รายละเอียด
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            วันที่ประกาศ
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            ดำเนินการ
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="announcement in announcements" :key="announcement.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="font-medium text-gray-900">{{ announcement.title }}</div>
          </td>
          <td class="px-6 py-4">
            <div class="text-sm text-gray-500 max-w-md line-clamp-2">
              {{ announcement.content }}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-500">{{ formatDate(announcement.createdAt) }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex justify-end gap-2">
              <button
                v-if="announcement.fileUrl"
                @click="emit('preview', announcement.fileUrl)"
                class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-700 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                ดูตัวอย่าง
              </button>
              <button
                v-if="announcement.fileUrl"
                @click="emit('download', announcement.fileUrl)"
                class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-700 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                ดาวน์โหลด
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>