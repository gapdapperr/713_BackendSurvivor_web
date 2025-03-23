<script setup lang="ts">
import { ref } from 'vue'
import type { Department, Position } from '@/types'
import DepartmentService from '@/services/DepartmentService'
import PositionService from '@/services/PositionService'
import TeacherService from '@/services/teacherService'

const props = defineProps<{
  onRefresh: () => Promise<void>
}>()

const isModalOpen = ref(false) // State for modal visibility
const newTeacher = ref({
  firstName: '',
  lastName: '',
  academicPositionId: '',
  departmentId: '',
  username: '',
  password: '',
})

const availablePositions = ref<Position[]>([])
const availableDepartments = ref<Department[]>([])

const selectedFile = ref<File | null>(null)

// Function to handle file selection
function handleFileSelection(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    selectedFile.value = file // Store the selected file
  }
}

// Function to open the modal
async function openModal() {
  isModalOpen.value = true
  await fetchDepartments()
  await fetchPositions()
}

// Function to close the modal
function closeModal() {
  isModalOpen.value = false
  newTeacher.value = {
    firstName: '',
    lastName: '',
    academicPositionId: '',
    departmentId: '',
    username: '',
    password: '',
  }
}

// Function to fetch departments
async function fetchDepartments() {
  try {
    const response = await DepartmentService.getDepartments()
    availableDepartments.value = response.data
  } catch (error) {
    console.error(error)
  }
}

// Function to fetch positions
async function fetchPositions() {
  try {
    const response = await PositionService.getPositions()
    availablePositions.value = response.data
  } catch (error) {
    console.error(error)
  }
}

// Function to handle adding a new teacher
async function handleAddTeacher() {
  try {
    const formData = new FormData()
    formData.append('firstName', newTeacher.value.firstName)
    formData.append('lastName', newTeacher.value.lastName)
    formData.append('academicPositionId', newTeacher.value.academicPositionId)
    formData.append('departmentId', newTeacher.value.departmentId)
    formData.append('username', newTeacher.value.username)
    formData.append('password', newTeacher.value.password)

    if (selectedFile.value) {
      formData.append('profile', selectedFile.value) // Append the file
    }

    await TeacherService.addTeacher(formData) // Send FormData
    await props.onRefresh()
    closeModal()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <!-- Add Teacher Button -->
    <button
      @click="openModal"
      class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      เพิ่มอาจารย์
    </button>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
        >
          <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
            Add New Teacher
          </h3>
          <div class="mt-4">
            <label for="firstName" class="block text-sm font-medium text-gray-700"
              >First Name</label
            >
            <input
              v-model="newTeacher.firstName"
              id="firstName"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <label for="lastName" class="block text-sm font-medium text-gray-700 mt-4"
              >Last Name</label
            >
            <input
              v-model="newTeacher.lastName"
              id="lastName"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <label for="academicPositionId" class="block text-sm font-medium text-gray-700 mt-4"
            >Position</label
          >
          <select
            v-model="newTeacher.academicPositionId"
            id="academicPositionId"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="" disabled>Select Position</option>
            <option v-for="position in availablePositions" :key="position.id" :value="position.id">
              {{ position.title }}
            </option>
          </select>

          <label for="departmentId" class="block text-sm font-medium text-gray-700 mt-4"
            >Department</label
          >
          <select
            v-model="newTeacher.departmentId"
            id="departmentId"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="" disabled>Select Department</option>
            <option
              v-for="department in availableDepartments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.name }}
            </option>
            <option
              v-for="department in availableDepartments"
              :key="department.id"
              :value="department.id"
            >
              {{ department.name }}
            </option>
          </select>
          <label for="username" class="block text-sm font-medium text-gray-700 mt-4"
            >Username</label
          >
          <input
            v-model="newTeacher.username"
            id="username"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <label for="password" class="block text-sm font-medium text-gray-700 mt-4"
            >Password</label
          >
          <input
            v-model="newTeacher.password"
            id="password"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <div class="mt-4">
            <label for="profile" class="block text-sm font-medium text-gray-700"
              >Profile Picture</label
            >
            <div class="flex items-center gap-4">
              <!-- Hidden file input -->
              <input
                type="file"
                id="profile"
                name="profile"
                accept="image/*"
                class="hidden"
                @change="handleFileSelection"
              />
              <!-- Label styled as a button -->
              <label
                for="profile"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                Browse File
              </label>
              <!-- Display selected file name -->
              <span v-if="selectedFile" class="text-sm text-gray-500">{{ selectedFile.name }}</span>
            </div>
          </div>
          <!-- Submit and Cancel Buttons -->
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
            <button
              @click="handleAddTeacher"
              class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <button
              @click="closeModal"
              class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
