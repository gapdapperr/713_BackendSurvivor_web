<script setup lang="ts">
import { ref } from 'vue'
import type { Student } from '@/types'

// Explicitly define the props
defineProps<{
  students: Student[]
}>()

// State for managing modal visibility and selected student
const isModalOpen = ref(false)
const selectedStudent = ref<Student | null>(null)

// Function to handle opening the modal
function openModal(student: Student) {
  selectedStudent.value = student
  isModalOpen.value = true
}

// Function to handle closing the modal
function closeModal() {
  isModalOpen.value = false
  selectedStudent.value = null
}

// Function to handle advisor selection
function selectAdvisor(advisor: string) {
  console.log(`Selected advisor "${advisor}" for student ID: ${selectedStudent.value?.studentId}`)
  closeModal()
}
</script>

<template>
  <div class="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
    <table class="table w-full text-left border-collapse">
      <!-- head -->
      <thead class="bg-gray-100 text-gray-700">
        <tr>
          <th class="px-4 py-2 text-gray-800">#</th>
          <th class="px-4 py-2 text-gray-800">Student ID</th>
          <th class="px-4 py-2 text-gray-800">Profile</th>
          <th class="px-4 py-2 text-gray-800">Name</th>
          <th class="px-4 py-2 text-gray-800">Department</th>
          <th class="px-4 py-2 text-gray-800">Advisor</th>
          <th class="px-4 py-2 text-gray-800">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(student, index) in students"
          :key="student.id"
          class="hover:bg-gray-50 even:bg-gray-50"
        >
          <th class="px-4 py-2 text-gray-800">{{ index + 1 }}</th>
          <td class="px-4 py-2 text-gray-800">{{ student.studentId }}</td>
          <td class="px-4 py-2">
            <img
              :src="student.profilePicture"
              alt="Profile"
              class="w-10 h-10 rounded-full border border-gray-300"
            />
          </td>
          <td class="px-4 py-2 text-gray-800">{{ student.firstName }} {{ student.lastName }}</td>
          <td class="px-4 py-2 text-gray-800">{{ student.department }}</td>
          <td class="px-4 py-2 text-gray-800">{{ student.advisor }}</td>
          <td class="px-4 py-2 text-gray-800">
            <button
              @click="openModal(student)"
              class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              เลือกอาจารย์ที่ปรึกษา
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg text-gray-600 font-medium mb-3">เลือกอาจารย์ที่ปรึกษา</h3>
        <p class="mb-4 text-sm text-gray-600">
          สำหรับนักศึกษา:
          <strong>{{ selectedStudent?.firstName }} {{ selectedStudent?.lastName }}</strong>
        </p>
        <div class="space-y-2">
          <button
            @click="selectAdvisor('Dr. Smith')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Dr. Smith
          </button>
          <button
            @click="selectAdvisor('Dr. Johnson')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Dr. Johnson
          </button>
          <button
            @click="selectAdvisor('Dr. Brown')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Dr. Brown
          </button>
        </div>
        <button
          @click="closeModal"
          class="mt-4 w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles if needed */
</style>
