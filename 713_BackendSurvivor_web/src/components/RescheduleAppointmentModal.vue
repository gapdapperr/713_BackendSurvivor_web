<script setup lang="ts">
import { ref } from 'vue';
import AppointmentService from '@/services/AppointmentService';


const props = defineProps({
    appointmentId: Number,
    onRefresh: Function
});

const isVisible = ref(false); // Modal visibility state
const appointmentDate = ref(''); // Date picker model
const appointmentTime = ref(''); // Time picker model

async function submitForm() {
    if (appointmentDate.value && appointmentTime.value && props.appointmentId) {
        const combinedDatetime = `${appointmentDate.value}T${appointmentTime.value}:00`;
        const dateTime = new Date(combinedDatetime);
        const newTime = dateTime.toISOString();


        const response = await AppointmentService.rescheduleAppointment(props.appointmentId, newTime);
        if (props.onRefresh) {
            props.onRefresh();
        }
        closeModal(); // Close modal after submitting
    }


}

const openModal = () => {
  isVisible.value = true;
};

// Close the modal
const closeModal = () => {
  isVisible.value = false;
};

</script>

<template>
  <div>
    <!-- Button to open the modal -->
    <button
      @click="openModal"
      class="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
    >
      เปลี่ยนเวลา
    </button>

    <!-- Modal -->
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2 class="text-xl font-bold text-gray-800 mb-4">เปลี่ยนเวลานัดหมาย</h2>
        <form @submit.prevent="submitForm()" class="space-y-4">
          <div>
            <label for="appointmentDate" class="block text-sm font-medium text-gray-700">เลือกวันที่</label>
            <input
              type="date"
              id="appointmentDate"
              v-model="appointmentDate"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="appointmentTime" class="block text-sm font-medium text-gray-700">เลือกเวลา</label>
            <input
              type="time"
              id="appointmentTime"
              v-model="appointmentTime"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="flex justify-end gap-4">
            <button
              type="submit"
              class="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
            >
              ยืนยัน
            </button>
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200"
            >
              ปิด
            </button>
          </div>
        </form>
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
  text-align: left;
}

/* Form Field Styling */
label {
  font-size: 14px;
  font-weight: 500;
  color: #374151; /* Dark gray text */
}

input {
  font-size: 14px;
  color: #374151; /* Dark gray text */
}

input::placeholder {
  color: #9ca3af; /* Light gray placeholder */
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
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* Blue focus ring */
}
</style>
