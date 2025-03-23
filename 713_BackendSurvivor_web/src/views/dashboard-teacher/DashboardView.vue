<script setup>


const dashboardItems = [
  
  {
    title: "รายชื่อนักศึกษา",
    description: "ช้อมูลรายชื่อนักศึกษาที่อยู่ในที่ปรึกษา",
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
</script>

<template>
  <div class="flex flex-col items-center mt-10">
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
</template>