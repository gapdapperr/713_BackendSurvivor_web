<script setup>
import axios from 'axios';
import { onMounted } from 'vue';

const dashboardItems = [
  {
    title: "รายชื่อนักศึกษา",
    description: "ข้อมูลรายชื่อนักศึกษาที่อยู่ในที่ปรึกษา",
    linkText: "ไปที่หน้ารายชื่อ",
    link: "#",
    icon: "👩‍💻",
  },
  {
    title: "สร้างประกาศ",
    description: "สร้างประกาศสำหรับนักศึกษา",
    linkText: "ไปที่หน้าสร้างประกาศ",
    link: "#",
    icon: "📄",
  },
  {
    title: "สรุปการนัดหมาย",
    description: "ดูสถิติการนัดหมาย",
    linkText: "ไปที่หน้าสรุปการนัดหมาย",
    link: "#",
    icon: "📈",
  },
];
//ต้องเชื่อมกับ api เพื่อเรียกดูข้อมูลอาจารย์
const professor = {
  name: " ",
  department: " ",
  contact: " ",
  avatar: "https://via.placeholder.com/150", // เปลี่ยนเป็น URL รูปจริง
};

const fetchTeacherData = async () => {
  try {
    const response = await axios.get ("https://api.example.com/professor"); //เปลี่ยนเป็น api จริง
    teacher.value = response.data 
  } catch (error) {
    console.error("❌ ดึงข้อมูลอาจารย์ล้มเหลว:", error)
  }
}

onMounted(() => {
  fetchTeacherData();
});
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
        <a :href="item.link" class="text-blue-500 font-medium mt-4 inline-block hover:underline">
          {{ item.linkText }} →
        </a>
      </div>
    </div>

    <!-- กล่องแสดงโปรไฟล์อาจารย์ -->
    <div class="mt-10 bg-white p-6 rounded-xl shadow-md flex items-center w-full max-w-5x1 mx-auto">
      <div class="flex-shrink-0">
        <img :src="professor.avatar" alt="อาจารย์" class="w-32 h-32 rounded-lg" />
      </div>
      <div class="ml-6">
        <h2 class="text-2xl font-semibold">ข้อมูลอาจารย์</h2>
        <p class="mt-2 text-lg"><strong>ชื่อ:</strong> {{ professor.name }}</p>
        <p class="text-lg"><strong>ภาควิชา:</strong> {{ professor.department }}</p>
        <p class="text-lg"><strong>ติดต่อ:</strong> {{ professor.contact }}</p>
      </div>
    </div>
  </div>
</template>
