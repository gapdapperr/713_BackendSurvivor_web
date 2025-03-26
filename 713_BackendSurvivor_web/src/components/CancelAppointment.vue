<script setup lang="ts">
import { ref } from 'vue'
import AppointmentService from '@/services/AppointmentService'

const props = defineProps({
  appointmentId: Number,
  onRefresh: Function
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

  if (props.onRefresh) {
  props.onRefresh() // Refresh the appointment list after cancellation
  }
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
    <!-- Button to open the modal -->
    <button
      @click="cancelAppointment"
      class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
    >
      ยกเลิกการนัดหมาย
    </button>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal-overlay" @click.self="handleCancel">
      <div class="modal-content">
        <h3 class="text-xl font-bold text-gray-800 mb-4">ยืนยันการยกเลิกการนัดหมาย</h3>
        <p class="text-gray-600 mb-6">คุณต้องการยกเลิกการนัดหมายนี้หรือไม่?</p>
        <div class="flex justify-end gap-4">
          <button
            @click="handleConfirmCancel"
            class="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
          >
            ยืนยัน
          </button>
          <button
            @click="handleCancel"
            class="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modal Overlay Styling */
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

/* Modal Content Styling */
.modal-content {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 90%;
  text-align: center;
}

/* Button Styling */
button {
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5); /* Red focus ring */
}
</style>
