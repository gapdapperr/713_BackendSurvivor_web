<script setup lang="ts">
import { ref } from 'vue'
import type { Student } from '@/types'
import { useMessageStore } from '@/stores/message'

// Explicitly define the props
const props = defineProps<{
  students: Student[]
  onRefresh: () => Promise<void>
}>()
</script>

<template>
  <!-- Main container with shadow and rounded corners -->
  <div class="bg-white rounded-lg shadow-lg border border-gray-200">
    <!-- Table wrapper with overflow handling -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Table header -->
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Student ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Department
            </th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(student, index) in students"
            :key="student.id"
            class="hover:bg-gray-50 transition-colors duration-200"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex-shrink-0 relative w-10 h-10">
                <img
                  :src="
                    student.user.profile ||
                    'https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/files/uploads/user.png'
                  "
                  alt="Profile"
                  class="absolute inset-0 w-full h-full rounded-full object-cover border-2 border-gray-300 ring-2 ring-blue-500 ring-offset-2 ring-offset-white"
                />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ student.studentId }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ student.firstName }} {{ student.lastName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ student.department.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles if needed */
</style>
