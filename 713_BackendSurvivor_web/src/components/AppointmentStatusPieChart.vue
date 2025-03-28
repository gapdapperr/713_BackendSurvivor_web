<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import type { AppointmentSummary } from '@/types/appointment'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  summary: AppointmentSummary
}>()

const chartData = {
  labels: [
    'ยืนยันการนัดหมาย',
    'รอการตอบรับ',
    'เสนอเวลาใหม่',
    'อาจารย์ตอบรับแล้ว',
    'ยกเลิกโดยอาจารย์',
    'ยกเลิกโดยนักศึกษา',
  ],
  datasets: [
    {
      data: [
        props.summary.APPOINTMENT_CONFIRMED.length,
        props.summary.AWAITING_RESPONSE.length,
        props.summary.NEW_DATE_PURPOSED.length,
        props.summary.ACCEPTED_BY_TEACHER.length,
        props.summary.CANCELLED_BY_TEACHER.length,
        props.summary.CANCELLED_BY_STUDENT.length,
      ],
      backgroundColor: [
        '#10B981', // green
        '#FBBF24', // yellow
        '#F97316', // orange
        '#3B82F6', // blue
        '#EF4444', // red
        '#9CA3AF', // gray
      ],
      borderWidth: 0,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        font: {
          size: 14,
        },
        padding: 20,
      },
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || ''
          const value = context.raw || 0
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = Math.round((value * 100) / total)
          return `${label}: ${value} (${percentage}%)`
        },
      },
    },
  },
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold mb-4">สรุปสถานะการนัดหมายทั้งหมด</h3>
    <div class="h-[400px]">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
