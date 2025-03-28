<script setup lang="ts">
import { ref } from 'vue'
import StudentService from '@/services/StudentService'

interface Student {
  id: number
  firstName: string
  lastName: string
  user: {
    profile: string | null
  }
}

const students = ref<Student[] | null>(null) // Define the students array with proper type
const isLoading = ref(false) // Loading state
const props = defineProps<{ teacherId: number }>() // Define the teacherId prop

const showModal = ref(false) // Modal visibility state

// Fetch students data from the service
async function fetchStudents() {
  isLoading.value = true // Start loading
  try {
    const response = await StudentService.getStudentByTeacherId(props.teacherId)
    students.value = response.data
  } catch (error) {
    console.error('Error fetching students:', error)
  } finally {
    isLoading.value = false // Stop loading
  }
}

// Function to open the modal
const openModal = () => {
  showModal.value = true
  fetchStudents()
}

// Function to close the modal
const closeModal = () => {
  showModal.value = false
  students.value = null
}
</script>

<template>
  <div>
    <!-- Button to open the modal -->
    <button
      @click="openModal"
      class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
    >
      ดูนักศึกษา
    </button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3 class="text-lg font-bold text-gray-800 mb-4">รายชื่อนักศึกษา</h3>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="text-center text-gray-500">
          กำลังโหลด...
        </div>

        <!-- Students Table -->
        <div v-else-if="students && students.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  รูปโปรไฟล์
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ชื่อ
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="student in students"
                :key="student.id"
                class="hover:bg-gray-50 transition-colors duration-200"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex-shrink-0 relative w-10 h-10">
                    <img
                      :src="
                        student.user.profile ||
                        'https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/files/uploads/user.png'
                      "
                      alt="Profile"
                      class="absolute inset-0 w-full h-full rounded-full object-cover border-2 border-gray-300 ring-2 ring-blue-500 ring-offset-2 ring-offset-white"
                    />
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ student.firstName }} {{ student.lastName }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Close Button -->
        <div class="flex justify-end mt-4">
          <button
            @click="closeModal"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            ปิด
          </button>
        </div>
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
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  transition: background-color 0.2s ease-in-out;
}
</style>
