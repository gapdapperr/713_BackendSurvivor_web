<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppointmentService from '@/services/AppointmentService'
import AppointmentTeacherTable from '@/components/AppointmentTeacherTable.vue'


const appointments = ref([])

async function fetchAppointment() {
  const userString = localStorage.getItem('user')
  if (!userString) {
    return
  }
  const user = JSON.parse(userString)
  const teacherId = user.teacher.id
  const reponse = await AppointmentService.getAppointmentsByTeacherId(teacherId)
    appointments.value = reponse.data
}

onMounted(() => {
  fetchAppointment()
})
</script>

<template>
<h1>จัดการนัดหมาย</h1>
<AppointmentTeacherTable :appointments="appointments" :onRefresh="fetchAppointment"/>
</template>
