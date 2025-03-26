<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { Appointment } from '@/types';
import ConfirmAppointmentByStudent from './ConfirmAppointmentByStudent.vue'
import CancelAppointment from './CancelAppointment.vue'
import AppointmentService from '@/services/AppointmentService';


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

function formatDate(utcDate: string): string {
  const date = new Date(utcDate)
  return date.toLocaleString() // Converts UTC to local time
}
</script>


<template>
    <div class="appointment-list">
      <h1 class="title">จัดการนัดหมาย</h1>
      <div v-for="appointment in appointments" :key="appointment.id" class="appointment-card">
        <div class="appointment-header">
          <h3>{{ appointment.title }}</h3>
          <span class="status">{{ appointment.status }}</span>
        </div>
  
        <p><strong>รายละเอียด:</strong> {{ appointment.content }}</p>
        <p><strong>วันที่นัดหมาย:</strong> {{ formatDate(appointment.requestedTime) }}</p>
        <p v-if="appointment.status === 'เสนอเวลานัดหมายใหม่'">
          <strong>วันที่นัดหมายใหม่:</strong> {{ formatDate(appointment.finalTime) }}
        </p>
        <p><strong>วันที่สร้าง:</strong> {{ formatDate(appointment.createdAt) }}</p>
  
        <div class="appointment-actions">
          <div v-if="appointment.status === 'ยอมรับโดยอาจารย์' || appointment.status === 'เสนอเวลานัดหมายใหม่'">
            <ConfirmAppointmentByStudent :appointmentId="appointment.id"/>
          </div>
          <div v-if="appointment.status !== 'ยกเลิกโดยนักศึกษา' && appointment.status !== 'ยกเลิกโดยอาจารย์' && appointment.status !== 'ยืนยันการนัดหมาย'">
            <CancelAppointment :appointmentId="appointment.id"/>
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
    padding: 20px;
  }
  
  /* Title styling */
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
  }
  
  /* Individual appointment card */
  .appointment-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
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
  }
  
  .status {
    background-color: #f0f0f0;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    color: #555;
  }
  
  /* Text styling for card content */
  .appointment-card p {
    margin: 8px 0;
    font-size: 16px;
    color: #333;
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
    padding: 8px 15px;
    font-size: 14px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  