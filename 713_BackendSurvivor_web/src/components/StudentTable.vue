<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Student } from '@/types'

// Explicitly define the props
defineProps<{
  students: Student[]
}>()
// State for managing modal visibility and selected student/advisor
const isModalOpen = ref(false)
const selectedStudent = ref<Student | null>(null)
const selectedAdvisor = ref('')

// List of advisors
const advisors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Brown']

// Function to handle opening the modal
function openModal(student: Student) {
  selectedStudent.value = student
  // Set the initial value for the dropdown
  if (student.teacher) {
    selectedAdvisor.value = `${student.teacher.firstName} ${student.teacher.lastName}`
  } else {
    selectedAdvisor.value = ''
  }
  isModalOpen.value = true
}

// Add a computed property for teacher's full name
const currentTeacherName = computed(() => {
  if (!selectedStudent.value?.teacher) return ''
  return `${selectedStudent.value.teacher.firstName} ${selectedStudent.value.teacher.lastName}`
})

// Function to handle closing the modal
function closeModal() {
  isModalOpen.value = false
  selectedStudent.value = null
  selectedAdvisor.value = ''
}

// Function to handle advisor selection
function handleSubmit() {
  if (selectedAdvisor.value) {
    console.log(
      `Selected advisor "${selectedAdvisor.value}" for student ID: ${selectedStudent.value?.studentId}`,
    )
    closeModal()
  }
}
</script>

<template>
  <!-- Main container with shadow and rounded corners -->
  <div class="bg-white rounded-lg shadow-lg border border-gray-200">
    <!-- Table wrapper with overflow handling -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Table header -->
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Student ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Department
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Advisor
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(student, index) in students"
            :key="student.id"
            class="hover:bg-gray-50 transition-colors duration-200"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <img
                :src="student.profilePicture"
                alt="Profile"
                class="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ student.studentId }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ student.firstName }} {{ student.lastName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ student.department.name }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm"
              :class="student.teacher ? 'text-gray-900' : 'text-amber-600 font-medium'"
            >
              <div class="flex items-center">
                <span
                  v-if="!student.teacher"
                  class="mr-2 flex-shrink-0 w-2 h-2 rounded-full bg-amber-400"
                ></span>
                {{
                  student.teacher
                    ? `${student.teacher.firstName} ${student.teacher.lastName}`
                    : 'ไม่มีอาจารย์ที่ปรึกษา'
                }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="openModal(student)"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                เลือกอาจารย์ที่ปรึกษา
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <!-- Modal panel -->
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
        >
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                เลือกอาจารย์ที่ปรึกษา
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  สำหรับนักศึกษา:
                  <span class="font-medium"
                    >{{ selectedStudent?.firstName }} {{ selectedStudent?.lastName }}</span
                  >
                </p>
              </div>
              <div class="mt-4">
                <select
                  v-model="selectedAdvisor"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="" disabled>เลือกอาจารย์ที่ปรึกษา</option>
                  <option
                    v-for="advisor in advisors"
                    :key="advisor"
                    :value="advisor"
                    :selected="advisor === currentTeacherName"
                  >
                    {{ advisor }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
            <button
              type="button"
              @click="handleSubmit"
              :disabled="!selectedAdvisor"
              :class="[
                'inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200',
                selectedAdvisor
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed',
              ]"
            >
              ยืนยัน
            </button>
            <button
              type="button"
              @click="closeModal"
              class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles if needed */
</style>
