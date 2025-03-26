<script setup lang="ts">
import { ref } from 'vue'
import AppointmentService from '@/services/AppointmentService'

const props = defineProps({
  appointmentId: Number
})

const isModalVisible = ref(false)

async function cancelAppointment() {
  const appointmentId = props.appointmentId
  if (!appointmentId) {
    return
  }
  // Show the confirmation modal before proceeding with cancellation
  isModalVisible.value = true
}

async function handleConfirmCancel() {
  const appointmentId = props.appointmentId
  if (!appointmentId) {
    return
  }

  const response = await AppointmentService.cancelAppointment(appointmentId)


  // After cancellation, hide the modal
  isModalVisible.value = false
}

function handleCancel() {
  // Close the modal without canceling the appointment
  isModalVisible.value = false
}
</script>

<template>
  <div>
    <button @click="cancelAppointment">ยกเลิกการนัดหมาย</button>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal">
        <h3>ยืนยันการยกเลิกการนัดหมาย</h3>
        <p>คุณต้องการยกเลิกการนัดหมายนี้หรือไม่?</p>
        <button @click="handleConfirmCancel">ยืนยัน</button>
        <button @click="handleCancel">ยกเลิก</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  min-width: 300px;
}

button {
  margin: 10px;
}
</style>
