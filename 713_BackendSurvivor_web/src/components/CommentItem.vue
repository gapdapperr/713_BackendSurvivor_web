<script setup lang="ts">
import { ref } from 'vue'
import type { Comment } from '@/types'
import ReplyForm from './ReplyForm.vue'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'

const props = defineProps<{ comment: Comment }>()
const showReplyForm = ref(false)

const emit = defineEmits<{
  (e: 'reply', payload: { commentId: number; content: string }): void
}>()

const handleReply = (content: string) => {
  emit('reply', { commentId: props.comment.id, content })
  showReplyForm.value = false
}

const formatDate = (date: string) => {
  return format(new Date(date), 'PPp', { locale: th })
}

// function for role checking
const isTeacher = (reply: Comment) => reply.user?.role === 'ROLE_TEACHER'

// function for getting display name
const getDisplayName = (reply: Comment) => {
  if (isTeacher(reply) && reply.teacher) {
    return `${reply.teacher.firstName} ${reply.teacher.lastName}`
  }
  if (reply.student) {
    return `${reply.student.firstName} ${reply.student.lastName}`
  }
  return 'Unknown User'
}
</script>

<template>
  <div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md">
    <!-- Comment Section -->
    <div class="p-4">
      <!-- Comment Header -->
      <div class="flex items-center gap-2 mb-2">
        <span class="font-medium"
          >{{ comment.teacher.firstName }} {{ comment.teacher.lastName }}</span
        >
        <span class="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">อาจารย์</span>
        <span class="text-sm text-gray-500">
          {{ formatDate(comment.createdAt) }}
        </span>
      </div>

      <!-- Comment Content -->
      <div class="text-gray-700 bg-gray-50 p-3 rounded-md">
        {{ comment.content }}
      </div>
    </div>

    <!-- Replies Section -->
    <div v-if="comment.replies?.length" class="border-t border-gray-100">
      <div
        v-for="reply in comment.replies"
        :key="reply.id"
        class="p-4 pl-8"
        :class="isTeacher(reply) ? 'bg-blue-50/50' : 'bg-gray-50'"
      >
        <!-- Reply Header -->
        <div class="flex items-center gap-2 mb-2">
          <!-- User Name -->
          <span class="font-medium">{{ getDisplayName(reply) }}</span>

          <!-- Role Badge -->
          <span
            class="text-xs px-2 py-1 rounded-full"
            :class="isTeacher(reply) ? 'bg-blue-50 text-blue-600' : 'bg-gray-200 text-gray-600'"
          >
            {{ isTeacher(reply) ? 'อาจารย์' : 'นักศึกษา' }}
          </span>

          <!-- Date -->
          <span class="text-sm text-gray-500">
            {{ formatDate(reply.createdAt) }}
          </span>
        </div>

        <!-- Reply Content -->
        <div
          class="text-gray-700 p-3 rounded-md border border-gray-100"
          :class="isTeacher(reply) ? 'bg-white' : 'bg-white'"
        >
          {{ reply.content }}
        </div>
      </div>
    </div>

    <!-- Reply Controls -->
    <div class="p-4 border-t border-gray-100">
      <button
        v-if="!showReplyForm"
        @click="showReplyForm = true"
        class="text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        + ตอบกลับ
      </button>
      <ReplyForm v-else @submit="handleReply" @cancel="showReplyForm = false" />
    </div>
  </div>
</template>
