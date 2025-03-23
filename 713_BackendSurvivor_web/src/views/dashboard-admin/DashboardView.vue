<script setup>

const dashboardItems = [
  {
    title: "จัดการอาจารย์",
    description: "เพิ่ม และปรับปรุงข้อมูลอาจารย์",
    linkText: "ไปที่หน้าจัดการอาจารย์",
    link: "#",
    icon: "🧑🏻‍🏫",
  },
  {
    title: "จัดการนักศึกษา",
    description: "แก้ไข และลบข้อมูลนักศึกษา",
    linkText: "ไปที่หน้าจัดการนักศึกษา",
    link: "#",
    icon: "🧑🏻‍💻",
  },
  {
    title: "สรุปการนัดหมาย",
    description: "ดูสถิติการนัดหมาย",
    linkText: "ไปที่หน้าสรุปการนัดหมาย",
    link: "#",
    icon: "📈",
  },
];
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="container max-w-screen-lg text-center">
    <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="item in dashboardItems"
        :key="item.title"
        class="bg-white p-6 rounded-xl shadow-md w-80 text-center"
      >
        <div class="text-4xl">{{ item.icon }}</div>
        <h2 class="text-lg font-semibold mt-4">{{ item.title }}</h2>
        <p class="text-gray-600 text-sm mt-2">{{ item.description }}</p>
        <a :href="item.link" class="text-blue-500 font-medium mt-4 inline-block hover:underline">
          {{ item.linkText }} →
        </a>
      </div>
    </div>
  </div>
</div>
</template>