<script setup lang="ts">
import type { Comment } from '@/types'
import CommentItem from './CommentItem.vue'

defineProps<{
  comments: Comment[]
}>()

defineEmits<{
  (e: 'reply', payload: { commentId: number; content: string }): void
}>()
</script>

<template>
  <div class="space-y-4">
    <CommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @reply="$emit('reply', $event)"
    />
  </div>
</template>
