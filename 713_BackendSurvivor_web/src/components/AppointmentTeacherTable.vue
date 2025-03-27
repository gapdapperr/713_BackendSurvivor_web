<script setup lang="ts">
import AppointmentService from '@/services/AppointmentService';
import RescheduleAppointmentModal from './RescheduleAppointmentModal.vue';
import CancelAppointment from './CancelAppointment.vue';
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

</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>นักศึกษา</th>
        <th>เรื่อง</th>
        <th>รายละเอียด</th>
        <th>วันที่นัดหมาย</th>
        <th>วันที่นัดหมายใหม่</th>
        <th>สถานะ</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="appointment in props.appointments" :key="appointment.id">
            <td>{{ appointment.student.user.profile }}</td>
            <td>{{ appointment.student.firstName }} {{ appointment.student.lastName }}</td>
            <td>{{ appointment.title }}</td>
            <td>{{ appointment.content }}</td>
            <td>{{ appointment.requestedTime }}</td>
            <td v-if="appointment.status === 'เสนอเวลานัดหมายใหม่' || appointment.requestedTime != appointment.finalTime && appointment.status === 'ยืนยันการนัดหมาย'">{{ appointment.finalTime }}</td>
            <td v-else></td>
            <td>{{ appointment.status }}</td>
            <td v-if="appointment.status === 'รอการตอบรับจากอาจารย์'"><button @click="confirmAppointment(appointment.id)">ยืนยัน</button></td>
            <td v-if="appointment.status === 'รอการตอบรับจากอาจารย์'"><RescheduleAppointmentModal :onRefresh="props.onRefresh" :appointmentId="appointment.id"/></td>
            <td v-if="appointment.status === 'รอการตอบรับจากอาจารย์'"><CancelAppointment :appointmentId="appointment.id" :onRefresh="props.onRefresh"/> </td>
        </tr>
    </tbody>
  </table>
</template>
