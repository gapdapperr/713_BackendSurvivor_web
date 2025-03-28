<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue'
import type { Appointment } from '@/types'
import ConfirmAppointmentByStudent from './ConfirmAppointmentByStudent.vue'
import CancelAppointment from './CancelAppointment.vue'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'

const appointments = ref<Appointment[]>([])

const props = defineProps<{
  appointment: Appointment[]
  onRefresh: Function
}>()

watchEffect(() => {
  appointments.value = props.appointment
})

const formatDate = (date: string | null) => {
  if (!date) return '-'
  return format(new Date(date), 'PPp', { locale: th })
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
  <div class="appointment-list">
    <div v-for="appointment in appointments" :key="appointment.id" class="appointment-card">
      <div class="appointment-header">
        <h3>{{ appointment.title }}</h3>
        <span
  :class="{
    [statusColors[getStatusKey(appointment.status)].bg]: true,
    [statusColors[getStatusKey(appointment.status)].text]: true,
    [statusColors[getStatusKey(appointment.status)].border]: true,
    'inline-flex px-3 py-1 rounded-full text-xs font-medium': true
  }"
>
  {{ appointment.status }}
</span>
      </div>

      <p><strong>รายละเอียด:</strong> {{ appointment.content }}</p>
      <p v-if="appointment.status != 'ยืนยันการนัดหมาย'">
        <strong>วันที่นัดหมาย:</strong> {{ formatDate(appointment.requestedTime) }}
      </p>
      <p v-if="appointment.status === 'เสนอเวลานัดหมายใหม่'">
        <strong>วันที่นัดหมายใหม่:</strong> {{ formatDate(appointment.finalTime) }}
      </p>
      <p v-if="appointment.status === 'ยืนยันการนัดหมาย'">
        <strong>วันที่นัดหมาย:</strong> {{ formatDate(appointment.finalTime) }}
      </p>
      <p><strong>วันที่สร้าง:</strong> {{ formatDate(appointment.createdAt) }}</p>

      <div class="appointment-actions">
        <div
          v-if="
            appointment.status === 'ยอมรับโดยอาจารย์' ||
            appointment.status === 'เสนอเวลานัดหมายใหม่'
          "
        >
          <ConfirmAppointmentByStudent
            :appointmentId="appointment.id"
            :onRefresh="props.onRefresh"
          />
        </div>
        <div
          v-if="
            appointment.status !== 'ยกเลิกโดยนักศึกษา' &&
            appointment.status !== 'ยกเลิกโดยอาจารย์' &&
            appointment.status !== 'ยืนยันการนัดหมาย'
          "
        >
          <CancelAppointment :appointmentId="appointment.id" :onRefresh="props.onRefresh" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* General container for appointments */
.appointment-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  background-color: #f9fafb; /* Light gray background similar to StudentView */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for the container */
}

/* Individual appointment card */
.appointment-card {
  background-color: #ffffff; /* White background for cards */
  border: 1px solid #e5e7eb; /* Light gray border */
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Subtle shadow for cards */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Smooth hover effect */
}

.appointment-card:hover {
  transform: translateY(-2px); /* Slight lift on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Enhanced shadow on hover */
}

/* Header inside card */
.appointment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.appointment-header h3 {
  font-size: 20px;
  margin: 0;
  font-weight: bold;
  color: #111827; /* Darker text for titles */
}

/* Text styling for card content */
.appointment-card p {
  margin: 8px 0;
  font-size: 16px;
  color: #374151; /* Dark gray text */
}

/* Styling for buttons or actions */
.appointment-actions {
  margin-top: 20px;
  display: flex;
  gap: 15px;
  justify-content: flex-start;
}

/* Buttons style */
button {
  padding: 10px 16px;
  font-size: 14px;
  color: white;
  background-color: #3b82f6; /* Blue button background */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #2563eb; /* Darker blue on hover */
}

button:disabled {
  background-color: #93c5fd; /* Light blue for disabled state */
  cursor: not-allowed;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .appointment-card {
    padding: 16px;
  }

  .appointment-header h3 {
    font-size: 18px;
  }

  .appointment-card p {
    font-size: 14px;
  }

  button {
    font-size: 12px;
    padding: 8px 12px;
  }
}
</style>
