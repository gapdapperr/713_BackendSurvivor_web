<script setup lang="ts">
import { ref, defineProps } from 'vue'
import type { Teacher } from '@/types'
import PositionService from '@/services/PositionService'
import DepartmentService from '@/services/DepartmentService'
import teacherService from '@/services/teacherService'

// Define the incoming teacher prop
const props = defineProps<{
  Teacher: Teacher
  onRefresh: () => void
}>()

// Local reactive variables for the modal form
const showModal = ref(false)
const firstName = ref()
const lastName = ref()
const academicPosition = ref()
const department = ref()
const availablePosition = ref()
const availableDepartment = ref()



async function fetchPositions() {
  try {
    const response = await PositionService.getPositions()
    availablePosition.value = response.data
  } catch (error) {
    console.log(error)
  }
}

async function fetchDepartments() {
  try {
    const response = await DepartmentService.getDepartments()
    availableDepartment.value = response.data
  } catch (error) {
    console.log(error)
  }
}

// Function to open the modal
const openModal = () => {
  fetchPositions()
  fetchDepartments()
  firstName.value = props.Teacher.firstName
  lastName.value = props.Teacher.lastName
  academicPosition.value = props.Teacher.academicPosition.id
  department.value = props.Teacher.department.id
  showModal.value = true
}

// Function to close the modal
const closeModal = () => {
  showModal.value = false
}

// Function to save changes (update teacher data)
const saveChanges = async () => {
  // Here you would typically emit an event or call an API to update the teacher
  const updatedTeacher = {
    firstName: firstName.value,
    lastName: lastName.value,
    academicPositionId: academicPosition.value,
    departmentId: department.value,
  }
  console.log(updatedTeacher)
  const Teacher = await teacherService.updateTeacher(props.Teacher.id, updatedTeacher)
  props.onRefresh() // Refresh the teacher list
  closeModal() // Close the modal after saving changes
}
</script>

<template>
  <div>
    <!-- Edit Button -->
    <button @click="openModal">แก้ไข</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>Edit Teacher Profile</h3>
        <form @submit.prevent="saveChanges">
          <div>
            <label for="firstName">First Name:</label>
            <input v-model="firstName" type="text" id="firstName" required />
          </div>
          <div>
            <label for="lastName">Last Name:</label>
            <input v-model="lastName" type="text" id="lastName" required />
          </div>
          <div>
            <label for="position">Academic Position:</label>
            <select v-model="academicPosition" name="academicPosition" id="academicPosition">
              <option value="" disabled>Please select position</option>
              <option v-for="position in availablePosition" :key="position.id" :value="position.id">
                {{ position.title }}
              </option>
            </select>
          </div>
          <div>
            <label for="department">Department:</label>
            <select v-model="department" name="department" id="department">
              <option value="" disabled>Please select department</option>
              <option
                v-for="department in availableDepartment"
                :key="department.id"
                :value="department.id"
              >
                {{ department.name }}
              </option>
            </select>
          </div>
          <div>
            <button type="submit">Save Changes</button>
            <button type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Basic styling for the modal */
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

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.modal form {
  display: flex;
  flex-direction: column;
}

.modal form div {
  margin-bottom: 10px;
}

button {
  margin: 5px;
  padding: 8px 12px;
  cursor: pointer;
}

button[type='submit'] {
  background-color: #4caf50;
  color: white;
}

button[type='button'] {
  background-color: #f44336;
  color: white;
}
</style>
