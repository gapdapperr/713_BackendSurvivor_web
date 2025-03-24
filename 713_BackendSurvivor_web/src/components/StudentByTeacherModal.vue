<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import StudentService from '@/services/StudentService'

const students = ref() // Define the students array
const props = defineProps<{ teacherId: number }>()  // Define the teacherId prop


const showModal = ref(false)  // Modal visibility state

// Fetch students data from the service
async function fetchStudents() {
try {
  const response = await StudentService.getAllStudentsByTeacherId(props.teacherId)
  students.value = response.data
} catch (error) {
  console.log(error)
}
}



const openModal = () => {
  showModal.value = true
    fetchStudents()
}

const closeModal = () => {
  showModal.value = false
  students.value = null
}

</script>

<template>
  <div>
    <!-- Button to open the modal -->
    <button @click="openModal">ดูนักศึกษา</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="openModal">
      <div class="modal" @click.stop>
        <h3>Student List</h3>
        <table v-if="students">
            <thead>
                <th></th>
                <th>Name</th>
            </thead>
            <tbody>
                <tr v-for="student in students" :key="student.id">
                    <td><img :src="student.user.profile || 'https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/files/uploads/user.png'" alt=""></td>
                    <td>{{ student.firstName }} {{ student.lastName }}</td>
                </tr>
            </tbody>
        </table>
        <h1 v-else>No Student Found</h1>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modal overlay styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal window styling */
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
}

.modal ul {
  list-style-type: none;
  padding: 0;
}

.modal li {
  margin: 10px 0;
}

button {
  margin-top: 10px;
  padding: 8px 12px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>
