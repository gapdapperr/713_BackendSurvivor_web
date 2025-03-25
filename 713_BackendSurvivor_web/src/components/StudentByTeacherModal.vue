<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import StudentService from '@/services/StudentService'

const students = ref() // Define the students array
const props = defineProps<{ teacherId: number }>()  // Define the teacherId prop


const showModal = ref(false)  // Modal visibility state

// Fetch students data from the service
async function fetchStudents() {
try {
  const response = await StudentService.getStudentByTeacherId(props.teacherId)
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
        <div v-if="students" class="overflow-x-auto">
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
        <p v-else class="text-gray-500 text-center">ไม่พบนักศึกษา</p>
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
