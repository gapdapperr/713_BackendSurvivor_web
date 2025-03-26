@@ -0,0 +1,110 @@
<script setup lang="ts">
import { ref } from 'vue';
import AppointmentService from '@/services/AppointmentService';



const isVisible = ref(false); // Modal visibility state
const appointmentDate = ref(''); // Date picker model
const appointmentTime = ref(''); // Time picker model
const title = ref(''); // Title input model
const content = ref(''); // Content input model

// Open the modal
const openModal = () => {
  isVisible.value = true;
};

// Close the modal
const closeModal = () => {
  isVisible.value = false;
};

async function submitForm() {
  if (appointmentDate.value && appointmentTime.value && title.value && content.value) {
    const combinedDatetime = `${appointmentDate.value}T${appointmentTime.value}:00`;
    const dateTime = new Date(combinedDatetime);
    const requestedTime = dateTime.toISOString();

    const appointment = {
      title: title.value,
      content: content.value,
      requestedTime: requestedTime,
    };

    const response = await AppointmentService.addNewAppointment(appointment);
    console.log();
    console.log(response);

    closeModal(); // Close modal after submitting
  }
};




</script>


<template>
    
    <button @click="openModal">สร้างการนัดหมาย</button>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>สร้างการนัดหมาย</h2>
      <form @submit.prevent="submitForm">
        <label for="title">ชื่อเรื่อง</label>
        <input type="text" id="title" v-model="title" required />
        <label for="content">รายละเอียด</label>
        <textarea id="content" v-model="content"></textarea>
        <label for="appointmentDate">เลือกวันที่:</label>
        <input type="date" id="appointmentDate" v-model="appointmentDate" required />

        <label for="appointmentTime">เลือกเวลา:</label>
        <input type="time" id="appointmentTime" v-model="appointmentTime" required />

        <button type="submit">สร้างการนัดหมาย</button>
        <button type="button" @click="closeModal">ปิด</button>
      </form>
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
  }
  
  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type="button"] {
    background-color: #f44336;
  }
  </style>
  
No newline at end of file
