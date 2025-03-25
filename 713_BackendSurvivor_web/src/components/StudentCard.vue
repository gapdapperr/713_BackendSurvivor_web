<script setup lang="ts">
import type { Student } from '@/types'
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'

defineProps<{
  student: Student
}>()
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
  >
    <div class="p-6">
      <div class="flex items-center space-x-6">
        <!-- Profile Image -->
        <div class="flex-shrink-0">
          <img
            :src="
              student.user.profile ||
              'https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/files/uploads/user.png'
            "
            :alt="`${student.firstName} ${student.lastName}`"
            class="h-16 w-16 rounded-full object-cover border-2 border-gray-200 ring-2 ring-blue-500 ring-offset-2"
          />
        </div>

        <!-- Student Info -->
        <div class="flex-1">
          <div class="text-xl font-medium text-gray-900">
            {{ student.firstName }} {{ student.lastName }}
          </div>
          <div class="text-sm text-gray-500">รหัสนักศึกษา: {{ student.studentId }}</div>
          <div class="text-sm text-gray-500">{{ student.department.name }}</div>
        </div>

        <!-- Action Button -->
        <RouterLink
          :to="{
            name: 'teacher-student-comments-view',
            params: { studentId: student.studentId },
          }"
          class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
        >
          <ChatBubbleLeftIcon class="mr-2 h-5 w-5" />
          ความคิดเห็น
        </RouterLink>
      </div>
    </div>
  </div>
</template>
