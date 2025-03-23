<script setup lang="ts">
import { ref, watch } from 'vue'
import StudentService from '@/services/StudentService'
import type { Student } from '@/types'

const props = defineProps<{
  teacherId: number | null
  isOpen: boolean
  onClose: () => void
}>()

const students = ref<Student[]>([])
const isLoading = ref(false)

// Fetch students when the modal is opened
watch(
  () => props.teacherId,
  async (newTeacherId) => {
    if (newTeacherId !== null) {
      await fetchStudents(newTeacherId)
    }
  }
)

// Function to fetch students for a specific teacher
async function fetchStudents(teacherId: number) {
  try {
    isLoading.value = true
    const response = await StudentService.getAllStudentsByTeacherId(teacherId)
    students.value = response.data
  } catch (error) {
    console.error('Error fetching students:', error)
  } finally {
    isLoading.value = false
  }
}

// Function to handle modal close
function handleClose() {
  students.value = [] // Clear the students array
  props.onClose() // Call the parent-provided onClose handler
}
</script>
<template>
  <div
    v-if="isOpen"
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
          Students List
        </h3>
        <div class="mt-4">
          <div v-if="isLoading" class="text-gray-500">Loading students...</div>
          <ul v-else>
            <li
              v-for="student in students"
              :key="student.id"
              class="text-sm text-gray-700"
            >
              {{ student.firstName }} {{ student.lastName }}
            </li>
            <li v-if="students.length === 0" class="text-gray-500">No students found.

            </li>
          </ul>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            @click="handleClose"
            class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
