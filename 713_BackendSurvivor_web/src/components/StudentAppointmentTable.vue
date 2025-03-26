<script setup lang="ts">
import { ref } from 'vue'
import type { Appointment } from '@/types'
import AppointmentService from '@/services/AppointmentService'
import ConfirmAppointmentByStudent from './ConfirmAppointmentByStudent.vue'
import CancelAppointment from './CancelAppointment.vue'

const appointments = ref<Appointment[]>([])

async function fetchAppointments() {
  const userString = localStorage.getItem('user')
  if (!userString) {
    return
  }
  const user = JSON.parse(userString)
  const studentId = user.student.studentId
  const response = await AppointmentService.getAppointmentsByStudentId(studentId)
  appointments.value = response.data
}

// Function to format the date to local time
function formatDate(utcDate: string): string {
  const date = new Date(utcDate)
  return date.toLocaleString() // This will return the date in the local time zone
}

fetchAppointments()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>เรื่อง</th>
        <th>รายละเอียด</th>
        <th>วันที่นัดหมาย</th>
        <th>สถานะ</th>
        <th>วันที่นัดหมายใหม่</th>
        <th>วันที่สร้าง</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="appointment in appointments" :key="appointment.id">
        <td>{{ appointment.title }}</td>
        <td>{{ appointment.content }}</td>
        <td>{{ formatDate(appointment.requestedTime) }}</td>
        <td>{{ appointment.status }}</td>
        <td v-if="appointment.status === 'เสนอเวลานัดหมายใหม่'">
          {{ formatDate(appointment.finalTime) }}
        </td>
        <td v-else>-</td>
        <td>{{ formatDate(appointment.createdAt) }}</td>
        <td
          v-if="
            appointment.status === 'ยอมรับโดยอาจารย์' ||
            appointment.status === 'เสนอเวลานัดหมายใหม่'
          "
        >
          <ConfirmAppointmentByStudent :appointmentId="appointment.id" />
        </td>
        <td
          v-if="
            appointment.status !== 'ยกเลิกโดยนักศึกษา' &&
            appointment.status !== 'ยกเลิกโดยอาจารย์' &&
            appointment.status !== 'ยืนยันการนัดหมาย'
          "
        >
          <CancelAppointment :appointmentId="appointment.id" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
