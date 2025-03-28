<script setup lang="ts">
import AnnouncementTable from '@/components/AnnouncementTable.vue'
import CreateAnnouncementModal from '@/components/CreateAnnouncementModal.vue'
import FilePreviewModal from '@/components/FilePreviewModal.vue'
import AnnouncementService from '@/services/AnnouncementService'
import { useMessageStore } from '@/stores/message'
import type { Announcement, CreateAnnouncementForm } from '@/types'
import { onMounted, ref } from 'vue'

const announcements = ref<Announcement[]>([])
const isLoading = ref(false)
const messageStore = useMessageStore()
const selectedFile = ref<string | null>(null)
const isCreateModalOpen = ref(false)
const isSubmitting = ref(false)

const handlePreview = (fileUrl: string) => {
  selectedFile.value = selectedFile.value === fileUrl ? null : fileUrl
}

const handleDownload = (fileUrl: string) => {
  window.open(fileUrl, '_blank')
}

const handleCreateAnnouncement = async (formData: CreateAnnouncementForm) => {
  try {
    isSubmitting.value = true
    await AnnouncementService.createAnnouncement(formData)
    messageStore.updateMessage('สร้างประกาศเรียบร้อยแล้ว', 'success')
    isCreateModalOpen.value = false
    await fetchAnnouncements()
  } catch (error) {
    console.error('Error creating announcement:', error)
    messageStore.updateMessage('ไม่สามารถสร้างประกาศได้', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const fetchAnnouncements = async () => {
  try {
    isLoading.value = true
    const response = await AnnouncementService.getAnnouncementsByTeacher()
    announcements.value = response.data
  } catch (error) {
    console.error('Error fetching announcements:', error)
    messageStore.updateMessage('ไม่สามารถดึงข้อมูลประกาศได้', 'error')
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchAnnouncements)
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">ประกาศ</h1>
    <button
      @click="isCreateModalOpen = true"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      สร้างประกาศ
    </button>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"
      ></div>
    </div>

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
      <p class="mt-2 text-sm text-gray-500">ยังไม่มีประกาศในขณะนี้</p>
    </div>

    <!-- Table Component -->
    <AnnouncementTable
      v-else
      :announcements="announcements"
      @preview="handlePreview"
      @download="handleDownload"
    />

    <!-- File Preview Modal -->
    <FilePreviewModal
      :is-open="!!selectedFile"
      :file-url="selectedFile"
      @close="selectedFile = null"
    />

    <!-- Create Announcement Modal -->
    <CreateAnnouncementModal
      :is-open="isCreateModalOpen"
      :is-submitting="isSubmitting"
      @close="isCreateModalOpen = false"
      @submit="handleCreateAnnouncement"
    />
  </div>
</template>
