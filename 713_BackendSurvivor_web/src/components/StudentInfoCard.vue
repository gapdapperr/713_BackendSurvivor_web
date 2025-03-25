<script setup lang="ts">
import type { Student } from '@/types'

defineProps<{
  student: Student
}>()
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
  >
    <div class="p-8">
      <div class="flex items-center space-x-8">
        <!-- Profile Image -->
        <div class="flex-shrink-0 relative group">
          <img
            :src="
              student.user.profile ||
              'https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/files/uploads/user.png'
            "
            :alt="`${student.firstName} ${student.lastName}`"
            class="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-indigo-500/50 ring-offset-4 ring-offset-white transform transition-all duration-300 group-hover:scale-105 group-hover:ring-indigo-500"
          />
        </div>

        <!-- Student Info -->
        <div class="flex-1 space-y-3">
          <div class="text-2xl font-bold text-gray-900 tracking-tight">
            {{ student.firstName }} {{ student.lastName }}
          </div>
          <div class="flex flex-col space-y-1">
            <div class="text-base text-gray-600 font-medium">
              <span class="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                รหัสนักศึกษา: {{ student.studentId }}
              </span>
            </div>
            <div class="text-base text-gray-600">
              <span class="inline-flex items-center space-x-2">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span>{{ student.department.name }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
