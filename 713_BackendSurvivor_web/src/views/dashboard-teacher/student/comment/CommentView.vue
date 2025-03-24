<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
import type { Comment } from '@/types'
import CommentService from '@/services/CommentService'

// Components
import StudentInfoCard from '@/components/StudentInfoCard.vue'
import CommentForm from '@/components/CommentForm.vue'
import CommentList from '@/components/CommentList.vue'

const store = useStudentStore()
const { student } = storeToRefs(store)
const comments = ref<Comment[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)

// รับ props
const props = defineProps<{ studentId: string }>()

// โหลดข้อมูล comments
const loadComments = async () => {
  if (!student.value) return

  try {
    isLoading.value = true
    const response = await CommentService.getCommentTeacherByStudentId(props.studentId)
    comments.value = response.data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}

// เพิ่ม comment ใหม่
const handleAddComment = async (content: string) => {
  try {
    isSubmitting.value = true
    await CommentService.addComment(props.studentId, content)
    await loadComments()
  } catch (error) {
    console.error('Error adding comment:', error)
  } finally {
    isSubmitting.value = false
  }
}

// เพิ่ม reply
const handleAddReply = async (payload: { commentId: number; content: string }) => {
  try {
    isSubmitting.value = true
    await CommentService.addReply(payload.commentId, props.studentId, payload.content)
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
      <!-- Student Info -->
      <StudentInfoCard v-if="student" :student="student" />

      <!-- New Comment Form -->
      <CommentForm :is-submitting="isSubmitting" @submit="handleAddComment" />

      <!-- Comments List with Loading -->
      <CommentList v-if="!isLoading" :comments="comments" @reply="handleAddReply" />
      <div v-else class="text-center">
        <span class="loading">กำลังโหลด...</span>
      </div>
    </div>
  </div>
</template>
