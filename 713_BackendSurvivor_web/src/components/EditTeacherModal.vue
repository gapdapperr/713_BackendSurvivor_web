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
    <button
      @click="openModal"
      class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
    >
      แก้ไข
    </button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3 class="text-lg font-bold text-gray-800 mb-4">แก้ไขข้อมูลอาจารย์</h3>
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label for="firstName" class="block text-sm font-medium text-gray-700">ชื่อ:</label>
            <input
              v-model="firstName"
              type="text"
              id="firstName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-sm font-medium text-gray-700">นามสกุล:</label>
            <input
              v-model="lastName"
              type="text"
              id="lastName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="position" class="block text-sm font-medium text-gray-700">ตำแหน่ง:</label>
            <select
              v-model="academicPosition"
              id="position"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>กรุณาเลือกตำแหน่ง</option>
              <option v-for="position in availablePosition" :key="position.id" :value="position.id">
                {{ position.title }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label for="department" class="block text-sm font-medium text-gray-700">แผนก:</label>
            <select
              v-model="department"
              id="department"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>กรุณาเลือกแผนก</option>
              <option
                v-for="department in availableDepartment"
                :key="department.id"
                :value="department.id"
              >
                {{ department.name }}
              </option>
            </select>
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  z-index: 50;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  transition: background-color 0.2s ease-in-out;
}
</style>
