<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CreateAnnouncementForm } from '@/types'

const userString = localStorage.getItem('user')
const user = JSON.parse(userString)

const props = defineProps<{
  isOpen: boolean
  isSubmitting: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [form: CreateAnnouncementForm]
}>()

const form = ref<CreateAnnouncementForm>({
  title: '',
  content: '',
  teacherId: 0,
  file: null,
})

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    form.value.file = input.files[0]
  }
}

const handleSubmit = () => {
  emit('submit', { ...form.value, teacherId: user.teacher.id })
  // Reset form
  form.value = {
    title: '',
    content: '',
    teacherId: user.teacher.id,
    file: null,
  }
}

// Initialize form with user data
onMounted(() => {
  form.value.teacherId = user.teacher.id
})
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
    @click="emit('close')"
  >
    <div class="bg-white rounded-lg overflow-hidden max-w-2xl w-full shadow-xl" @click.stop>
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-lg font-medium">สร้างประกาศใหม่</h3>
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

      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">หัวข้อ</label>
            <input
              type="text"
              id="title"
              v-model="form.title"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="content" class="block text-sm font-medium text-gray-700">เนื้อหา</label>
            <textarea
              id="content"
              v-model="form.content"
              rows="4"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">ไฟล์แนบ</label>
            <input
              type="file"
              @change="handleFileChange"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isSubmitting"
              class="inline w-4 h-4 mr-2 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {{ isSubmitting ? 'กำลังบันทึก...' : 'บันทึก' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
