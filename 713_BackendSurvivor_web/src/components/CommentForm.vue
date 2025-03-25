<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  isSubmitting: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', content: string): void
}>()

const content = ref('')

const handleSubmit = () => {
  emit('submit', content.value)
  content.value = ''
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <textarea
        v-model="content"
        rows="3"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="เพิ่มความคิดเห็น..."
      ></textarea>
      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="isSubmitting || !content.trim()"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'กำลังบันทึก...' : 'เพิ่มความคิดเห็น' }}
        </button>
      </div>
    </form>
  </div>
</template>
