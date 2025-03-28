<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { Comment } from '@/types'
import { useTeacherStore } from '@/stores/teacher'
import CommentService from '@/services/CommentService'

// Components
import TeacherInfoCard from '@/components/TeacherInfoCard.vue'
import CommentForm from '@/components/CommentForm.vue'
import CommentList from '@/components/CommentList.vue'

const store = useTeacherStore()
const { teacher } = storeToRefs(store)
const comments = ref<Comment[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)

// โหลดข้อมูล comments
const loadComments = async () => {
  if (!teacher.value) return

  try {
    isLoading.value = true
    const response = await CommentService.getCommentStudent()
    comments.value = response.data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}

// เพิ่ม reply
const handleAddReply = async (payload: { commentId: number; content: string }) => {
  try {
    isSubmitting.value = true
    await CommentService.addReplyByStudent(payload.commentId, payload.content)
    await loadComments()
  } catch (error) {
    console.error('Error adding reply:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(loadComments)
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Teacher Info -->
      <TeacherInfoCard v-if="teacher" :teacher="teacher" />

      <!-- Empty State -->
      <div v-else-if="comments.length === 0" class="text-center py-12">
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
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">ไม่มีข้อความ</h3>
        <p class="mt-2 text-sm text-gray-500">ยังไม่มีการสนทนาระหว่างคุณกับอาจารย์</p>
      </div>

      <!-- Comments List with Loading -->
      <CommentList v-if="!isLoading" :comments="comments" @reply="handleAddReply" />
      <div v-else class="text-center">
        <span class="loading">กำลังโหลด...</span>
      </div>
    </div>
  </div>
</template>
