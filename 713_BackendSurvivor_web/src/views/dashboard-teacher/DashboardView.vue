<script setup>
import { onMounted } from 'vue'

const dashboardItems = [
  {
    title: 'รายชื่อนักศึกษา',
    description: 'ข้อมูลรายชื่อนักศึกษาที่อยู่ในที่ปรึกษา',
    linkText: 'ไปที่หน้ารายชื่อ',
    link: 'teacher-students-view',
    icon: '👩‍💻',
  },
  {
    title: 'สร้างประกาศ',
    description: 'สร้างประกาศสำหรับนักศึกษา',
    linkText: 'ไปที่หน้าสร้างประกาศ',
    link: 'teacher-announcements-view',
    icon: '📄',
  },
  {
    title: 'สรุปการนัดหมาย',
    description: 'ดูสถิติการนัดหมาย',
    linkText: 'ไปที่หน้าสรุปการนัดหมาย',
    link: 'teacher-appointments-view',
    icon: '📈',
  },
]
//ต้องเชื่อมกับ api เพื่อเรียกดูข้อมูลอาจารย์
const userString = localStorage.getItem('user')


const user = JSON.parse(userString)

</script>

<template>
  <div class="flex flex-col items-center mt-10 w-full">
    <!-- กล่อง Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5x1">
      <div
        v-for="item in dashboardItems"
        :key="item.title"
        class="bg-white p-6 rounded-xl shadow-md text-center"
      >
        <div class="text-4xl">{{ item.icon }}</div>
        <h2 class="text-lg font-semibold mt-4">{{ item.title }}</h2>
        <p class="text-gray-600 text-sm mt-2">{{ item.description }}</p>
        <router-link
          :to="{ name: item.link }"
          class="text-blue-500 font-medium mt-4 inline-block hover:underline"
        >
          {{ item.linkText }} →
        </router-link>
      </div>
    </div>

    <!-- /กล่องแสดงโปรไฟล์อาจารย์ -->
    <div class="mt-10 bg-white p-6 rounded-xl shadow-md flex items-center w-full max-w-5x1 mx-auto">
      <div class="flex-shrink-0">
        <img :src="user.profile" alt="อาจารย์" class="w-32 h-32 rounded-lg" />
      </div>
      <div class="ml-6">
        <h2 class="text-2xl font-semibold">ข้อมูลอาจารย์</h2>
        <p class="mt-2 text-lg"><strong>ชื่อ:</strong> {{ user.teacher.firstName }}</p>
        <p class="mt-2 text-lg"><strong>นามสกุล:</strong> {{ user.teacher.lastName }}</p>
        <p class="text-lg"><strong>ภาควิชา:</strong> {{ user.teacher.department.name }}</p>
      </div>
    </div>
  </div>
</template>
