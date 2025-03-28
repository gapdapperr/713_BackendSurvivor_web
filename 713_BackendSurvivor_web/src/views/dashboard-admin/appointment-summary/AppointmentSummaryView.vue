<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { AppointmentSummary } from '@/types/appointment'
import AppointmentService from '@/services/AppointmentService'
import AppointmentTable from '@/components/AppointmentTable.vue'
import AppointmentStatusPieChart from '@/components/AppointmentStatusPieChart.vue'

const summary = ref<AppointmentSummary | null>(null)
const isLoading = ref(true)

const statusTitles = {
  APPOINTMENT_CONFIRMED: 'ยืนยันการนัดหมาย',
  AWAITING_RESPONSE: 'รอการตอบรับ',
  NEW_DATE_PURPOSED: 'เสนอเวลาใหม่',
  ACCEPTED_BY_TEACHER: 'อาจารย์ตอบรับแล้ว',
  CANCELLED_BY_TEACHER: 'ยกเลิกโดยอาจารย์',
  CANCELLED_BY_STUDENT: 'ยกเลิกโดยนักศึกษา',
}
const statusColors = {
  APPOINTMENT_CONFIRMED: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    count: 'bg-green-100 text-green-800',
  },
  AWAITING_RESPONSE: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    count: 'bg-yellow-100 text-yellow-800',
  },
  NEW_DATE_PURPOSED: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    count: 'bg-orange-100 text-orange-800',
  },
  ACCEPTED_BY_TEACHER: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    count: 'bg-indigo-100 text-indigo-800',
  },
  CANCELLED_BY_TEACHER: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    count: 'bg-red-100 text-red-800',
  },
  CANCELLED_BY_STUDENT: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    count: 'bg-gray-100 text-gray-800',
  },
}

// Visibility state for tables
const visibleTables = ref<Record<string, boolean>>({
  AWAITING_RESPONSE: true,
  ACCEPTED_BY_TEACHER: true,
  NEW_DATE_PURPOSED: true,
  APPOINTMENT_CONFIRMED: true,
  CANCELLED_BY_TEACHER: true,
  CANCELLED_BY_STUDENT: true,
})

const toggleTable = (status: string) => {
  visibleTables.value[status] = !visibleTables.value[status]
}

const formatDate = (date: string | null) => {
  if (!date) return '-'
  return format(new Date(date), 'PPp', { locale: th })
}

const fetchSummary = async () => {
  try {
    isLoading.value = true
    const response = await AppointmentService.getSummary()
    summary.value = response.data
  } catch (error) {
    console.error('Error fetching summary:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchSummary)
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">สรุปการนัดหมาย</h1>

    <!-- Pie Chart -->
    <div class="mb-8" v-if="!isLoading && summary">
      <AppointmentStatusPieChart :summary="summary" />
    </div>

    <div v-if="isLoading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"
      ></div>
    </div>

    <template v-else>
      <div v-for="(appointments, status) in summary" :key="status" class="mb-8">
        <!-- Status Card -->
        <div
          class="rounded-lg shadow-sm p-6 mb-4"
          :class="[
            statusColors[status as keyof typeof statusColors].bg,
            statusColors[status as keyof typeof statusColors].border,
          ]"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h2
                class="text-xl font-semibold"
                :class="statusColors[status as keyof typeof statusColors].text"
              >
                {{ statusTitles[status as keyof typeof statusTitles] }}
              </h2>
              <span
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="statusColors[status as keyof typeof statusColors].count"
              >
                {{ appointments.length }} รายการ
              </span>
            </div>
          </div>

          <!-- Toggle Button -->
          <button
            @click="toggleTable(status)"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            :class="statusColors[status as keyof typeof statusColors].text"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="visibleTables[status]"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <!-- Table with Transition -->
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-300 ease-in"
            enter-from-class="opacity-0 transform -translate-y-4"
            leave-to-class="opacity-0 transform -translate-y-4"
          >
            <div v-show="visibleTables[status]" class="mt-4">
              <AppointmentTable
                :appointments="appointments"
                :status="status as keyof typeof statusColors"
              />
            </div>
          </transition>
        </div>
      </div>
    </template>
  </div>
</template>
