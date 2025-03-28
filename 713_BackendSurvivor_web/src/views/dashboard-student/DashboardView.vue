<script setup lang="ts">
import AnnouncementService from '@/services/AnnouncementService'
import { onMounted, ref } from 'vue'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'

const latestAnnouncement = ref()

const dashboardItems = [
  {
    title: 'สร้างนัดหมายอาจารย์',
    description: 'สร้างนัดหมายกับอาจารย์ที่ปรึกษา',
    linkText: 'ไปที่หน้าสร้างนัดหมาย',
    link: 'student-appointments-view',
    icon: '📅',
  },
  {
    title: 'ประกาศ',
    description: 'แสดงรายการประกาศจากอาจารย์ที่ปรึกษา',
    linkText: 'ไปที่หน้าประกาศ',
    link: 'student-announcements-view',
    icon: '📄',
  },
  {
    title: 'รายการความคิดเห็น',
    description: 'รายการความคิดเห็นจากอาจารย์ที่ปรึกษา',
    linkText: 'ไปที่หน้าความคิดเห็น',
    link: 'student-teacher-view',
    icon: '💬',
  },
]

const formatDate = (date: string | null) => {
  if (!date) return '-'
  return format(new Date(date), 'PPp', { locale: th })
}


const userString = localStorage.getItem('user')
if (!userString) {
  throw new Error('User data not found in local storage')
}
const user = JSON.parse(userString)

// ฟังก์ชันดึงข้อมูลจาก API
const fetchAnnouncements = async () => {
  try {
    const response = await AnnouncementService.getLatestAnnouncement()
    latestAnnouncement.value = response.data
  } catch (error) {
    console.error('Error fetching announcements:', error)
  }
}

// ดึงข้อมูลเมื่อโหลดหน้า
onMounted(() => {
  fetchAnnouncements()
})
</script>

<template>
  <div class="flex flex-col items-center mt-10 w-full">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
      <div
        v-for="item in dashboardItems"
        :key="item.title"
        class="bg-white p-6 rounded-xl shadow-md text-center"
      >
        <div class="text-4xl">{{ item.icon }}</div>
        <h2 class="text-lg font-semibold mt-4">{{ item.title }}</h2>
        <p class="text-gray-600 text-sm mt-2">{{ item.description }}</p>
        <router-link :to="{ name: item.link}" class="text-blue-500 font-medium mt-4 inline-block hover:underline">
          {{ item.linkText }} →
        </router-link>
      </div>
    </div>

    <div class="mt-10 bg-white p-6 rounded-xl shadow-md w-full max-w-5xl">
      <h2 class="text-xl font-semibold mb-4">📢 ประกาศจากอาจารย์ที่ปรึกษา</h2>
      <div v-if="latestAnnouncement">
        <div class="mb-4">
          <h3 class="text-lg font-medium">{{ latestAnnouncement.title }}</h3>
          <p class="text-gray-600">{{ latestAnnouncement.content }}</p>
          <p class="text-sm text-gray-400">📅 {{ formatDate(latestAnnouncement.createdAt) }}</p>
          <iframe
  v-if="latestAnnouncement.fileUrl"
  :src="latestAnnouncement.fileUrl + '#page=1'"
  class="w-full h-[600px] mt-4 rounded-lg border border-gray-200 shadow-sm"
  frameborder="0"
  loading="lazy"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
          <hr class="my-4" />
        </div>
      </div>
      <p v-else class="text-gray-500">ไม่มีประกาศในขณะนี้</p>
    </div>

    <div class="mt-10 bg-white p-6 rounded-xl shadow-md flex items-center w-full max-w-5xl">
      <div class="flex-shrink-0">
        <img :src="user.profile" alt="นักศึกษา" class="w-40 h-40 rounded-lg" />
      </div>
      <div class="ml-6">
        <h2 class="text-2xl font-semibold">ข้อมูลส่วนตัว</h2>
        <p class="mt-2 text-lg"><strong>ชื่อ:</strong> {{ user.student.firstName }}</p>
        <p class="mt-2 text-lg"><strong>นามสกุล:</strong> {{ user.student.lastName }}</p>
        <p class="text-lg"><strong>รหัสนักศึกษา:</strong> {{ user.student.studentId }}</p>
        <p class="text-lg"><strong>ภาควิชา:</strong> {{ user.student.department.name }}</p>
      </div>
    </div>
  </div>
</template>
