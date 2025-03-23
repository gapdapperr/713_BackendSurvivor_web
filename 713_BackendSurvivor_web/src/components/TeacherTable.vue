<script setup lang="ts">
import type { Teacher, Student, Department, Position } from '@/types'
import StudentByTeacherModal from '@/components/StudentByTeacherModal.vue'
import TeacherService from '@/services/teacherService'
import StudentService from '@/services/StudentService'
import DepartmentService from '@/services/DepartmentService'
import PositionService from '@/services/PositionService'
import { ref, computed } from 'vue'

const props = defineProps<{
  teachers: Teacher[]
  onRefresh: () => Promise<void>
}>()

const isStudentModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedTeacher = ref<Teacher | null>(null)
const availableStudents = ref<Student[]>([])
const availablePositions = ref<Position[]>([])
const availableDepartments = ref<Department[]>([])
const selectedTeacherId = ref<number | null>(null)








async function fetchDepartments() {
  try {
    const response = await DepartmentService.getDepartments()
    availableDepartments.value = response.data
  } catch (error) {
    console.error(error)
  }
}

async function fetchPositions() {
  try {
    const response = await PositionService.getPositions()
    availablePositions.value = response.data
  } catch (error) {
    console.error(error)
  }
}

// Function to open the student modal
function openStudentModal(teacherId: number) {
  console.log('Opening modal for teacherId:', teacherId)
  selectedTeacherId.value = teacherId
  isStudentModalOpen.value = true
}

// Function to close the student modal
function closeStudentModal() {
  isStudentModalOpen.value = false
  selectedTeacherId.value = null
}



// Function to open the edit profile modal
async function openEditModal(teacher: Teacher) {
  selectedTeacher.value = teacher
  isEditModalOpen.value = true

  // Fetch available positions and departments
  await fetchDepartments()
  await fetchPositions()
}

// Function to close modals
function closeModals() {
  isStudentModalOpen.value = false
  isEditModalOpen.value = false
  selectedTeacher.value = null
  availableStudents.value = []
}



async function handleSubmit() {
  if (selectedTeacher.value) {
    try {
      await TeacherService.updateTeacher(selectedTeacher.value.id, {
        firstName: selectedTeacher.value.firstName,
        lastName: selectedTeacher.value.lastName,
        academicPositionId: selectedTeacher.value.academicPosition.id,
        departmentId: selectedTeacher.value.department.id,
      })
      await props.onRefresh()
      closeModals()
    } catch (error) {
      console.error(error)
    }
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
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Students</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="teacher in teachers"
            :key="teacher.id"
            class="hover:bg-gray-50 transition-colors duration-200"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex-shrink-0 relative w-10 h-10">
                <img
                  :src="teacher.user.profile"
                  alt="Profile"
                  class="absolute inset-0 w-full h-full rounded-full object-cover border-2 border-gray-300 ring-2 ring-blue-500 ring-offset-2 ring-offset-white"
                />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ teacher.firstName }} {{ teacher.lastName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ teacher.academicPosition.title }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ teacher.department.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ teacher._count?.students }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="openStudentModal(teacher.id)"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                ดูนักศึกษา
              </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="openEditModal(teacher)"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                แก้ไข
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


  </div>

  <!-- Modals -->
  <!-- Modal for viewing students -->
  <div
    v-if="isStudentModalOpen"
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
          Students of {{ selectedTeacher?.firstName }} {{ selectedTeacher?.lastName }}
        </h3>
        <div class="mt-4">
          <ul>
            <li
              v-for="student in availableStudents"
              :key="student.id"
              class="text-sm text-gray-700"
            >
              {{ student.firstName }} {{ student.lastName }}
            </li>
          </ul>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            @click="closeModals"
            class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for editing profile -->
  <div
    v-if="isEditModalOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div
        v-if="selectedTeacher"
        class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
      >
        <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Edit Profile</h3>
        <div class="mt-4">
          <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            v-model="selectedTeacher.firstName"
            id="firstName"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <label for="lastName" class="block text-sm font-medium text-gray-700 mt-4">Last Name</label>
          <input
            v-model="selectedTeacher.lastName"
            id="lastName"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <label for="position" class="block text-sm font-medium text-gray-700 mt-4">Position</label>
        <select
          v-model="selectedTeacher.academicPosition.id"
          id="position"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="" disabled>Select Position</option>
          <option v-for="position in availablePositions" :key="position.id" :value="position.id">
            {{ position.title }}
          </option>
        </select>

        <label for="department" class="block text-sm font-medium text-gray-700 mt-4">Department</label>
        <select
          v-model="selectedTeacher.department.id"
          id="department"
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
        </select>

        <!-- Submit and Cancel Buttons -->
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
          <button
            @click="handleSubmit"
            class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <button
            @click="closeModals"
            class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>


    <!-- Student Modal -->
    <StudentByTeacherModal
  :teacherId="selectedTeacherId"
  :isOpen="isStudentModalOpen"
  :onClose="closeStudentModal"
/>
</template>

<style scoped>
/* Add custom styles if needed */
</style>
