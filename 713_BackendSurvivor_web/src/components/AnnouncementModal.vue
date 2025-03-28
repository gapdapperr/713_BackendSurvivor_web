<script setup lang="ts">
import type { Announcement } from '@/types';
import { ref } from 'vue';



const props = defineProps<{
  announcement: Announcement
}>()

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}


const downloadPdf = async () => {
  try {
    const response = await fetch(props.announcement.fileUrl)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${props.announcement.title}.pdf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading PDF:', error)
  }
}
</script>

<template>
  <div>
    <!-- Trigger Button -->
    <button
      @click="openModal"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      ดูตัวอย่าง
    </button>
    <button
      @click="downloadPdf"
      class="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
    >
      ดาวน์โหลด
    </button>
   <!-- Modal Overlay -->
   <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 overflow-y-auto"
      @click="closeModal"
    >
  <!-- Modal Container -->
  <div class="min-h-screen py-6">
    <!-- Modal Content -->
    <div
      class="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-auto my-8"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
        <h3 class="text-lg font-semibold">{{ props.announcement.title }}</h3>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-4">
        <iframe
          v-if="props.announcement.fileUrl"
          :src="props.announcement.fileUrl"
          class="w-full h-[80vh] rounded-lg border border-gray-200"
          frameborder="0"
          loading="lazy"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<style scoped>
.fixed {
  overflow-y: auto;
}

/* Add backdrop filter support for older browsers */
@supports not (backdrop-filter: blur(4px)) {
  .backdrop-blur-sm {
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>