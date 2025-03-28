<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  fileUrl: string | null
}>()

const emit = defineEmits<{
  close: []
}>()

const getFileType = (url: string): string => {
  const ext = url.split('.').pop()?.toLowerCase() || ''
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image'
  if (['mp4', 'webm'].includes(ext)) return 'video'
  if (['mp3', 'wav'].includes(ext)) return 'audio'
  if (['pdf'].includes(ext)) return 'pdf'
  return 'other'
}
</script>

<template>
  <div
    v-if="isOpen && fileUrl"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
    @click="emit('close')"
  >
    <div
      class="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-xl"
      @click.stop
    >
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-lg font-medium">ตัวอย่างไฟล์</h3>
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-full p-1"
        >
          <span class="sr-only">ปิด</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="p-4">
        <!-- Image Preview -->
        <img
          v-if="fileUrl && getFileType(fileUrl) === 'image'"
          :src="fileUrl"
          class="max-w-full h-auto max-h-[70vh] mx-auto"
          alt="Preview"
        />

        <!-- Video Preview -->
        <video
          v-else-if="fileUrl && getFileType(fileUrl) === 'video'"
          controls
          class="max-w-full max-h-[70vh] mx-auto"
        >
          <source :src="fileUrl" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <!-- Audio Preview -->
        <audio v-else-if="fileUrl && getFileType(fileUrl) === 'audio'" controls class="w-full">
          <source :src="fileUrl" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <!-- PDF Preview -->
        <object
          v-else-if="fileUrl && getFileType(fileUrl) === 'pdf'"
          :data="fileUrl"
          type="application/pdf"
          class="w-full h-[70vh]"
        >
          <div class="text-center py-4">
            <p>ไม่สามารถแสดงไฟล์ PDF ได้ กรุณา</p>
            <a :href="fileUrl" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
              เปิดในแท็บใหม่
            </a>
          </div>
        </object>

        <!-- Other Files -->
        <div v-else class="text-center py-4">
          <p class="mb-4">ไม่สามารถแสดงตัวอย่างไฟล์นี้ได้</p>
          <a
            :href="fileUrl"
            target="_blank"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            เปิดในแท็บใหม่
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
