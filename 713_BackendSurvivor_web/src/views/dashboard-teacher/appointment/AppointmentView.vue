<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppointmentService from '@/services/AppointmentService'
import AppointmentTeacherTable from '@/components/AppointmentTeacherTable.vue'

const appointments = ref([])
const isLoading = ref(false)

async function fetchAppointment() {
  try {
    const userString = localStorage.getItem('user')
    if (!userString) {
      return
    }
    const user = JSON.parse(userString)
    const teacherId = user.teacher.id

    isLoading.value = true
    const response = await AppointmentService.getAppointmentsByTeacherId(teacherId)
    appointments.value = response.data
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchAppointment()
})
</script>

<template>
  <div class="dashboard p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">จัดการนัดหมาย</h2>

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="space-y-4">
      <div v-for="n in 3" :key="n" class="bg-white rounded-lg shadow-sm p-4 animate-pulse">
        <div class="flex items-center space-x-4">
          <div class="h-12 w-12 bg-gray-200 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div class="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="appointments.length === 0" class="text-center py-12">
      <svg
        class="mx-auto h-16 w-16 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">ไม่พบข้อมูลการนัดหมาย</h3>
      <p class="mt-2 text-sm text-gray-500">ยังไม่มีการนัดหมายในขณะนี้</p>
    </div>

    <!-- Appointment Teacher Table -->
    <div v-else>
      <AppointmentTeacherTable :appointments="appointments" :onRefresh="fetchAppointment" />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  /* Matches the StudentView background and layout */
  background-color: #f9fafb; /* Light gray background */
  padding: 24px;
  min-height: 100vh; /* Ensures full-screen height */
}

.text-2xl {
  /* Title styling */
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937; /* Dark gray text */
  margin-bottom: 16px;
}

.bg-gray-50 {
  /* Light gray background for the dashboard */
  background-color: #f9fafb;
}

.bg-white {
  /* White background for cards and skeletons */
  background-color: #ffffff;
}

.rounded-lg {
  /* Rounded corners for cards and skeletons */
  border-radius: 8px;
}

.shadow-sm {
  /* Subtle shadow for cards and skeletons */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.p-6 {
  /* Padding for the dashboard */
  padding: 24px;
}

.p-4 {
  /* Padding for cards and skeletons */
  padding: 16px;
}

.min-h-screen {
  /* Ensures the dashboard takes up the full screen */
  min-height: 100vh;
}

.space-y-4 > * + * {
  /* Vertical spacing between skeletons */
  margin-top: 16px;
}

.h-12 {
  /* Height for skeleton profile images */
  height: 48px;
}

.w-12 {
  /* Width for skeleton profile images */
  width: 48px;
}

.bg-gray-200 {
  /* Light gray background for skeleton elements */
  background-color: #e5e7eb;
}

.rounded-full {
  /* Circular skeleton profile images */
  border-radius: 9999px;
}

.flex {
  /* Flexbox for layout */
  display: flex;
}

.items-center {
  /* Align items vertically in the center */
  align-items: center;
}

.space-x-4 > * + * {
  /* Horizontal spacing between skeleton elements */
  margin-left: 16px;
}

.flex-1 {
  /* Flex-grow for skeleton text */
  flex-grow: 1;
}

.h-4 {
  /* Height for skeleton text lines */
  height: 16px;
}

.w-1\/4 {
  /* Width for short skeleton text lines */
  width: 25%;
}

.w-1\/2 {
  /* Width for medium skeleton text lines */
  width: 50%;
}

.h-8 {
  /* Height for skeleton buttons */
  height: 32px;
}

.w-24 {
  /* Width for skeleton buttons */
  width: 96px;
}

.animate-pulse {
  /* Pulse animation for skeletons */
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
