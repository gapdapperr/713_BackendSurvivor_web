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

      <!-- Comments List with Loading -->
      <CommentList v-if="!isLoading" :comments="comments" @reply="handleAddReply" />
      <div v-else class="text-center">
        <span class="loading">กำลังโหลด...</span>
      </div>
    </div>
  </div>
</template>
