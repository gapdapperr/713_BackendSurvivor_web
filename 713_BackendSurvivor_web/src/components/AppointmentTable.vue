<script setup lang="ts">
import type { Appointment } from '@/types/appointment'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'

defineProps<{
  appointments: Appointment[]
}>()

const formatDate = (date: string | null) => {
  if (!date) return '-'
  return format(new Date(date), 'PPp', { locale: th })
}
</script>

<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            หัวข้อ
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            อาจารย์ที่ปรึกษา
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            นักศึกษา
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            ภาควิชา
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            เวลาที่ขอนัด
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            เวลานัดสุดท้าย
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="appointment in appointments" :key="appointment.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 text-sm text-gray-900">
            {{ appointment.title }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">
            {{ appointment.teacher.firstName }} {{ appointment.teacher.lastName }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">
            {{ appointment.student.firstName }} {{ appointment.student.lastName }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">
            {{ appointment.student.department.name }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">
            {{ formatDate(appointment.requestedTime) }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">
            {{ formatDate(appointment.finalTime) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
