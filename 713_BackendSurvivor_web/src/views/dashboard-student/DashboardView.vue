<template>
  <h1>Student Dashboard</h1>
</template>
<script setup>


const dashboardItems = [
  
  {
    title: "สร้างนัดหมายอาจารย์",
    description: "สร้างนัดหมายกับอาจารย์ที่ตปรึกษา",
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