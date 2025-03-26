<script setup lang="ts">
import type { Appointment } from '@/types';
import { ref } from 'vue';
import AppointmentService from '@/services/AppointmentService';
import StudentAppointmentTable from '@/components/StudentAppointmentTable.vue';
import NewAppointmentModal from '@/components/NewAppointmentModal.vue';
import AppointmentCard from '@/components/AppointmentCard.vue';

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

fetchAppointments()

</script>

<template>
    <h1>จัดการนัดหมาย</h1>
    <NewAppointmentModal :onRefresh="fetchAppointments"/>
    <AppointmentCard :appointment="appointments" :onRefresh="fetchAppointments"/>


</template>