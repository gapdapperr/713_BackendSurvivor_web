<script setup lang="ts">
import { ref } from 'vue';
import AppointmentService from '@/services/AppointmentService';

const props = defineProps({
  appointmentId: Number,
  onRefresh: Function
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

  if (props.onRefresh) {
    props.onRefresh();
  }
  // Close modal after confirmation
  showModal.value = false;
}

// Function to cancel the confirmation
function cancelConfirmation() {
  showModal.value = false;
}
</script>

<template>
  <div>
    <!-- Button to trigger the modal -->
    <button
      @click="confirmAppointment"
      class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
    >
      ยืนยันการนัดหมาย
    </button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2 class="text-xl font-bold text-gray-800 mb-4">ยืนยันการนัดหมาย</h2>
        <p class="text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการยืนยันการนัดหมาย?</p>
        <div class="flex justify-end gap-4">
          <button
            @click="proceedWithConfirmation"
            class="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
          >
            ยืนยัน
          </button>
          <button
            @click="cancelConfirmation"
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
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* Blue focus ring */
}
</style>
