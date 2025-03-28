<script setup lang="ts">
import PositionService from '@/services/PositionService'
import DepartmentService from '@/services/DepartmentService'
import TeacherService from '@/services/teacherService'
import { ref } from 'vue'

const props = defineProps<{
  onRefresh: () => void
}>()

// Modal visibility state
const selectedFile = ref<File | null>(null)
const showModal = ref(false)
const newTeacher = ref({
  firstName: '',
  lastName: '',
  academicPositionId: '',
  departmentId: '',
  username: '',
  password: '',
})

// Function to handle file selection
function handleFileSelection(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    selectedFile.value = file // Store the selected file
  }
}

// Function to open the modal
const openModal = () => {
  showModal.value = true
}

// Function to close the modal
const closeModal = () => {
  showModal.value = false
  newTeacher.value = {
    firstName: '',
    lastName: '',
    academicPositionId: '',
    departmentId: '',
    username: '',
    password: '',
  }
}

async function AddTeacher() {
  const teacherData = new FormData()
  teacherData.append('firstName', newTeacher.value.firstName)
  teacherData.append('lastName', newTeacher.value.lastName)
  teacherData.append('academicPositionId', newTeacher.value.academicPositionId)
  teacherData.append('departmentId', newTeacher.value.departmentId)
  teacherData.append('username', newTeacher.value.username)
  teacherData.append('password', newTeacher.value.password)
  console.log(teacherData)
  if (selectedFile.value) {
    teacherData.append('profile', selectedFile.value) // Append the file
  }

  try {
    const response = await TeacherService.addTeacher(teacherData)
    console.log(response.data)
    props.onRefresh()
    closeModal()
  } catch (error) {
    console.log(error)
  }
}

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

fetchDepartments()
fetchPositions()
</script>

<template>
  <div>
    <!-- Button container with flex and justify-end -->
    <div class="flex justify-end mb-4">
      <!-- Button to open the modal -->
      <button
        @click="openModal"
        class="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        เพิ่มอาจารย์
      </button>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3 class="text-lg font-bold text-gray-800 mb-4">เพิ่มอาจารย์</h3>
        <form @submit.prevent="AddTeacher">
          <div class="mb-4">
            <label for="firstName" class="block text-sm font-medium text-gray-700">ชื่อ:</label>
            <input
              v-model="newTeacher.firstName"
              type="text"
              id="firstName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-sm font-medium text-gray-700">นามสกุล:</label>
            <input
              v-model="newTeacher.lastName"
              type="text"
              id="lastName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="position" class="block text-sm font-medium text-gray-700">ตำแหน่ง:</label>
            <select
              v-model="newTeacher.academicPositionId"
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
              v-model="newTeacher.departmentId"
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
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">ชื่อผู้ใช้:</label>
            <input
              v-model="newTeacher.username"
              type="text"
              id="username"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
  <label for="password" class="block text-sm font-medium text-gray-700">รหัสผ่าน:</label>
  <input
    v-model="newTeacher.password"
    type="password"
    id="password"
    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    required
    minlength="8"
    pattern="\d{8}"
    title="กรุณากรอกรหัสผ่าน 8 หลัก"
  />
  <p class="mt-1 text-sm text-gray-500">*กรุณากรอกรหัสผ่าน 8 หลัก</p>
</div>
          <div class="mb-4">
            <label for="profile" class="block text-sm font-medium text-gray-700">รูปโปรไฟล์:</label>
            <input
              type="file"
              id="profile"
              @change="handleFileSelection"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              accept="image/*"
            />
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
