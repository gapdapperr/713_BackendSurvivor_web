<script setup lang="ts">
import type { Comment } from '@/types'
import { ref } from 'vue'

const props = defineProps<{
  comment: Comment
  formatDate: (date: string) => string
  activeReplyId: number | null
}>()

const emit = defineEmits<{
  (e: 'reply', commentId: number | null): void
  (e: 'submitReply', payload: { commentId: number; content: string }): void
}>()

const toggleReply = (activeReplyId: number | null, commentId: number) => {
  emit('reply', activeReplyId === commentId ? null : commentId)
}

// local state for reply form
const replyContent = ref('')
const isSubmitting = ref(false)

const handleSubmitReply = () => {
  if (!replyContent.value.trim()) return
  emit('submitReply', {
    commentId: props.comment.id,
    content: replyContent.value,
  })
  replyContent.value = ''
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Main Comment -->
    <div class="p-6 border-l-4 border-indigo-500">
      <!-- Comment Header -->
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <h4 class="font-medium text-gray-900 flex items-center">
              <span class="text-lg"
                >{{ comment.teacher.firstName }} {{ comment.teacher.lastName }}</span
              >
              <span
                class="ml-2 text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold"
              >
                อาจารย์
              </span>
            </h4>
            <p class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Comment Content -->
      <div class="text-gray-700 bg-indigo-50/50 p-4 rounded-lg">
        {{ comment.content }}
      </div>
    </div>

    <slot name="replies"></slot>

    <!-- Reply Section -->
    <div class="border-t border-gray-100">
      <!-- Reply Button -->
      <div class="px-6 py-3 bg-gray-50">
        <button
          @click="toggleReply(activeReplyId, comment.id)"
          class="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <svg
            v-if="activeReplyId !== comment.id"
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          {{ activeReplyId === comment.id ? 'ยกเลิก' : 'ตอบกลับ' }}
        </button>
      </div>

      <!-- Reply Form -->
      <div
        v-if="activeReplyId === comment.id"
        class="px-6 py-4 bg-gray-50 border-t border-gray-100"
      >
        <form @submit.prevent="handleSubmitReply" class="space-y-4">
          <textarea
            v-model="replyContent"
            rows="2"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="ตอบกลับความคิดเห็น..."
          ></textarea>
          <div class="flex justify-end space-x-3">
            <button
              type="submit"
              :disabled="isSubmitting || !replyContent.trim()"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'กำลังบันทึก...' : 'ส่งการตอบกลับ' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
