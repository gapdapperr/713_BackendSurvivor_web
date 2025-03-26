<script setup lang="ts">
import { ref } from 'vue';
import AppointmentService from '@/services/AppointmentService';

const props = defineProps({
  appointmentId: Number
});

// State for showing and hiding the modal
const showModal = ref(false);

// Function to handle confirmation
async function confirmAppointment() {
  const appointmentId = props.appointmentId;
  if (!appointmentId) {
    return;
  }
  
  // Show modal
  showModal.value = true;
}

// Function to confirm the appointment
async function proceedWithConfirmation() {
  const appointmentId = props.appointmentId;
  if (!appointmentId) {
    return;
  }

  const response = await AppointmentService.confirmAppointmentByStudent(appointmentId);


  // Close modal after confirmation
  showModal.value = false;
}

// Function to cancel the confirmation
function cancelConfirmation() {
  showModal.value = false;
}
</script>

<template>
    <!-- Button to trigger the modal -->
    <button @click="confirmAppointment">ยืนยันการนัดหมาย</button>
  
    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>ยืนยันการนัดหมาย</h2>
        <p>คุณแน่ใจหรือไม่ว่าต้องการยืนยันการนัดหมาย?</p>
        <button @click="proceedWithConfirmation">ยืนยัน</button>
        <button @click="cancelConfirmation">ยกเลิก</button>
      </div>
    </div>
  

  </template>

      <!-- Modal Overlay Styling -->
      <style scoped>
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
  
      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
      }
  
      .modal-content button {
        margin: 10px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
      }
    </style>