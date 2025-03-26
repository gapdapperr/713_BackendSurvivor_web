<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const dashboardItems = [
  {
    title: "สร้างนัดหมายอาจารย์",
    description: "สร้างนัดหมายกับอาจารย์ที่ปรึกษา",
    linkText: "ไปที่หน้าสร้างนัดหมาย",
    link: "#",
    icon: "📅",
  },
  {
    title: "ประกาศ",
    description: "แสดงรายการประกาศจากอาจารย์ที่ปรึกษา",
    linkText: "ไปที่หน้าประกาศ",
    link: "#",
    icon: "📄",
  },
  {
    title: "รายการความคิดเห็น",
    description: "รายการความคิดเห็นจากอาจารย์ที่ปรึกษา",
    linkText: "ไปที่หน้าความคิดเห็น",
    link: "#",
    icon: "💬",
  },
];

// ข้อมูลประกาศ (มาจาก API)
const announcements = ref([]);

// ข้อมูลนักศึกษา (มาจาก API)
const studentProfile = ref({
  name: "",
  studentId: "",
  department: "",
  avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png", 
});

// ฟังก์ชันดึงข้อมูลจาก API
const fetchAnnouncements = async () => {
  try {
    const response = await axios.get("https://api.example.com/announcements"); // แก้ URL API
    announcements.value = response.data;
  } catch (error) {
    console.error("Error fetching announcements:", error);
  }
};

const fetchStudentProfile = async () => {
  try {
    const response = await axios.get("https://api.example.com/student-profile"); // แก้ URL API
    studentProfile.value = response.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
  }
};

// ดึงข้อมูลเมื่อโหลดหน้า
onMounted(() => {
  fetchAnnouncements();
  fetchStudentProfile();
});
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
        <a :href="item.link" class="text-blue-500 font-medium mt-4 inline-block hover:underline">
          {{ item.linkText }} →
        </a>
      </div>
    </div>

    <div class="mt-10 bg-white p-6 rounded-xl shadow-md w-full max-w-5xl">
      <h2 class="text-xl font-semibold mb-4">📢 ประกาศจากอาจารย์ที่ปรึกษา</h2>
      <div v-if="announcements.length > 0">
        <div v-for="announcement in announcements" :key="announcement.id" class="mb-4">
          <h3 class="text-lg font-medium">{{ announcement.title }}</h3>
          <p class="text-gray-600">{{ announcement.content }}</p>
          <p class="text-sm text-gray-400">📅 {{ announcement.date }}</p>
          <hr class="my-4" />
        </div>
      </div>
      <p v-else class="text-gray-500">ไม่มีประกาศในขณะนี้</p>
    </div>

    <div class="mt-10 bg-white p-6 rounded-xl shadow-md flex items-center w-full max-w-5xl">
      <div class="flex-shrink-0">
        <img :src="studentProfile.avatar" alt="นักศึกษา" class="w-40 h-40 rounded-lg" />
      </div>
      <div class="ml-6">
        <h2 class="text-2xl font-semibold">ข้อมูลส่วนตัว</h2>
        <p class="mt-2 text-lg"><strong>ชื่อ:</strong> {{ studentProfile.name }}</p>
        <p class="text-lg"><strong>รหัสนักศึกษา:</strong> {{ studentProfile.studentId }}</p>
        <p class="text-lg"><strong>ภาควิชา:</strong> {{ studentProfile.department }}</p>
      </div>
    </div>
  </div>
</template>
