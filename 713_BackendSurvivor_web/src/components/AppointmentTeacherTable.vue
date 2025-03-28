<script setup lang="ts">
import AppointmentService from '@/services/AppointmentService'
import RescheduleAppointmentModal from './RescheduleAppointmentModal.vue'
import CancelAppointment from './CancelAppointment.vue'
import type { AppointmentByTeacher } from '@/types'

const props = defineProps<{
  appointments: AppointmentByTeacher[]
  onRefresh: Function
}>()

async function confirmAppointment(appointmentId: number) {
  try {
    const response = await AppointmentService.confirmAppointmentByTeacher(appointmentId)
    props.onRefresh()
  } catch (error) {
    console.log(error)
  }
}

function formatDate(utcDate: string): string {
  const date = new Date(utcDate)
  return date.toLocaleString() // Converts UTC to local time
}



const statusColors = {
  APPOINTMENT_CONFIRMED: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
  },
  AWAITING_RESPONSE: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
  },
  NEW_DATE_PURPOSED: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
  },
  ACCEPTED_BY_TEACHER: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
  },
  CANCELLED_BY_TEACHER: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
  },
  CANCELLED_BY_STUDENT: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
  },
}

const getStatusKey = (status: string): keyof typeof statusColors => {
  const statusMap: { [key: string]: keyof typeof statusColors } = {
    'ยืนยันการนัดหมาย': 'APPOINTMENT_CONFIRMED',
    'รอการตอบรับจากอาจารย์': 'AWAITING_RESPONSE',
    'เสนอเวลานัดหมายใหม่': 'NEW_DATE_PURPOSED',
    'ยอมรับโดยอาจารย์': 'ACCEPTED_BY_TEACHER',
    'ยกเลิกโดยอาจารย์': 'CANCELLED_BY_TEACHER',
    'ยกเลิกโดยนักศึกษา': 'CANCELLED_BY_STUDENT'
  }
  return statusMap[status] as keyof typeof statusColors || 'AWAITING_RESPONSE'
}

</script>

<template>
  <div class="dashboard p-6 bg-gray-50 min-h-screen">
    <div class="appointment-teacher-table bg-white rounded-lg shadow-lg p-6">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              รูปโปรไฟล์
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              นักศึกษา
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              เรื่อง
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              รายละเอียด
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              วันที่นัดหมาย
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              วันที่นัดหมายใหม่
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              สถานะ
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              การจัดการ
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="appointment in props.appointments"
            :key="appointment.id"
            class="hover:bg-gray-50 transition-colors duration-200"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <img
                :src="appointment.student.user.profile || 'https://via.placeholder.com/40'"
                alt="Profile"
                class="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ appointment.student.firstName }} {{ appointment.student.lastName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ appointment.title }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ appointment.content }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(appointment.requestedTime) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <span
                v-if="
                  appointment.status === 'เสนอเวลานัดหมายใหม่' ||
                  (appointment.requestedTime !== appointment.finalTime &&
                    appointment.status === 'ยืนยันการนัดหมาย')
                "
              >
                {{ formatDate(appointment.finalTime) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
  <span
    :class="{
      [statusColors[getStatusKey(appointment.status)].bg]: true,
      [statusColors[getStatusKey(appointment.status)].text]: true,
      'inline-flex px-3 py-1 rounded-full text-xs font-medium': true
    }"
  >
    {{ appointment.status }}
  </span>
</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex flex-col items-start gap-2">
                <!-- Confirm Button -->
                <button
                  v-if="appointment.status === 'รอการตอบรับจากอาจารย์'"
                  @click="confirmAppointment(appointment.id)"
                  class="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  ยืนยัน
                </button>

                <!-- Reschedule Appointment Modal -->
                <RescheduleAppointmentModal
                  v-if="appointment.status === 'รอการตอบรับจากอาจารย์'"
                  :onRefresh="props.onRefresh"
                  :appointmentId="appointment.id"
                />

                <!-- Cancel Appointment -->
                <CancelAppointment
                  v-if="appointment.status === 'รอการตอบรับจากอาจารย์'"
                  :appointmentId="appointment.id"
                  :onRefresh="props.onRefresh"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the table container does not overflow */
.appointment-teacher-table {
  background-color: #ffffff; /* White background for the table */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 24px; /* Padding around the table */
  overflow-x: auto; /* Enable horizontal scrolling for smaller screens */
}

/* Constrain table layout */
table {
  width: 100%; /* Full width table */
  table-layout: fixed; /* Constrain column widths */
  border-collapse: collapse; /* Remove gaps between table cells */
}

/* Ensure table headers and cells wrap text */
th,
td {
  word-wrap: break-word; /* Wrap long text */
  overflow-wrap: break-word; /* Break long words */
  white-space: normal; /* Allow text to wrap */
}

/* Adjust button container to prevent overflow */
td .flex {
  flex-wrap: wrap; /* Wrap buttons to the next line if needed */
  gap: 8px; /* Add spacing between buttons */
}

/* Button styling */
button {
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out; /* Smooth hover effect */
}

button:hover {
  transform: translateY(-1px); /* Slight lift on hover */
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.5); /* Green focus ring */
}

/* Row hover effect */
.hover\:bg-gray-50:hover {
  background-color: #f9fafb; /* Light gray background on row hover */
}
</style>
