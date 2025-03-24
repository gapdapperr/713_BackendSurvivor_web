<script setup lang="ts">
import { ref, onMounted, toRef } from 'vue'
import { storeToRefs } from 'pinia'
import type { Comment } from '@/types'
import { useRouter } from 'vue-router'
import CommentService from '@/services/CommentService'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { useStudentStore } from '@/stores/student'
import StudentInfoCard from '@/components/StudentInfoCard.vue'
import CommentForm from '@/components/CommentForm.vue'
import CommentItem from '@/components/CommentItem.vue'

const store = useStudentStore()
const router = useRouter()
const comments = ref<Comment[]>([])
const isLoading = ref(false)

// refs for form handling
const newComment = ref('')
const replyContent = ref('')
const activeReplyId = ref<number | null>(null)
const isSubmitting = ref(false)

// รับเฉพาะ studentId จาก props
const props = defineProps<{
  studentId: string
}>()

// ใช้ store อย่างเดียวสำหรับข้อมูล student
const { student } = storeToRefs(store)
const studentId = toRef(props, 'studentId')

const formatDate = (date: string) => {
  return format(new Date(date), 'PPp', { locale: th })
}

const fetchComments = async () => {
  if (!student.value) return

  try {
    isLoading.value = true
    const response = await CommentService.getCommentTeacherByStudentId(studentId.value)
    comments.value = response.data
  } catch (error) {
    console.error('Error fetching comments:', error)
    router.push({ name: 'network-error-view' })
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchComments)

// methods for comments
const addComment = async () => {
  if (!newComment.value.trim() || !studentId.value) return

  try {
    isSubmitting.value = true
    await CommentService.addComment(studentId.value, newComment.value)
    newComment.value = ''
    await fetchComments()
  } catch (error) {
    console.error('Error adding comment:', error)
  } finally {
    isSubmitting.value = false
  }
}

const handleSubmitReply = async ({
  commentId,
  content,
}: {
  commentId: number
  content: string
}) => {
  if (!content.trim() || !studentId.value) return

  try {
    isSubmitting.value = true
    await CommentService.addReply(commentId, studentId.value, content)
    activeReplyId.value = null
    await fetchComments()
  } catch (error: any) {
    console.error('Error adding reply:', error?.response?.data || error)
    alert('ไม่สามารถตอบกลับความคิดเห็นได้ กรุณาลองใหม่อีกครั้ง')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto space-y-6">
      <StudentInfoCard v-if="student" :student="student" />
      <CommentForm :is-submitting="isSubmitting" @submit="addComment" />

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      </div>

      <!-- Comments List -->
      <template v-else>
        <CommentItem
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :format-date="formatDate"
          :active-reply-id="activeReplyId"
          @reply="activeReplyId = $event"
          @submit-reply="handleSubmitReply"
        >
          <template #replies>
            <!-- Replies Section -->
            <div v-if="comment.replies.length > 0" class="border-t border-gray-100">
              <div
                v-for="reply in comment.replies"
                :key="reply.id"
                class="p-6 pl-16 bg-gray-50 border-l-4 border-gray-300 hover:bg-gray-100/70 transition-colors"
              >
                <!-- Reply Header -->
                <div class="mb-3">
                  <div class="flex items-center justify-between">
                    <div class="space-y-1">
                      <h4 class="font-medium text-gray-800 flex items-center">
                        <span>{{ reply.student.firstName }} {{ reply.student.lastName }}</span>
                        <span
                          class="ml-2 text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-full font-medium"
                        >
                          นักศึกษา
                        </span>
                      </h4>
                      <p class="text-sm text-gray-500">{{ formatDate(reply.createdAt) }}</p>
                    </div>
                  </div>
                </div>

                <!-- Reply Content -->
                <div class="text-gray-700 bg-white/80 p-4 rounded-lg shadow-sm">
                  {{ reply.content }}
                </div>
              </div>
            </div>
          </template>
        </CommentItem>
      </template>
    </div>
  </div>
</template>
