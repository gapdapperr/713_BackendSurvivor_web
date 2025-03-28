<script setup>
import { ref } from 'vue';

const title = ref('');
const content = ref('');
const file = ref(null);
const announcements = ref([]);

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const saveAnnouncement = () => {
  const now = new Date();
  announcements.value.push({
    title: title.value,
    content: content.value,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
  });
  resetForm();
};

const resetForm = () => {
  title.value = '';
  content.value = '';
  file.value = null;
};
</script>

<template>
    <div class="container mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-center mb-6">สร้างประกาศ</h1>
      
      <!-- กล่องสร้างประกาศ -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-lg font-semibold mb-4">เพิ่มประกาศใหม่</h2>
        <div class="mb-4">
          <label class="block text-sm font-medium">ชื่อประกาศ:</label>
          <input v-model="title" type="text" class="w-full p-2 border rounded mt-1" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">เนื้อหาประกาศ:</label>
          <textarea v-model="content" class="w-full p-2 border rounded mt-1"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">อัปโหลดไฟล์:</label>
          <input type="file" @change="handleFileUpload" class="mt-1" />
        </div>
        <div class="flex space-x-4">
          <button @click="saveAnnouncement" class="bg-blue-500 text-white px-4 py-2 rounded">บันทึก</button>
          <button @click="resetForm" class="bg-gray-400 text-white px-4 py-2 rounded">ยกเลิก</button>
        </div>
      </div>
      
      <!-- กล่องแสดงรายการประกาศ -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold mb-4">รายการประกาศ</h2>
        <table class="w-full border-collapse border">
          <thead>
            <tr class="bg-gray-200">
              <th class="border p-2">ลำดับ</th>
              <th class="border p-2">ชื่อประกาศ</th>
              <th class="border p-2">เนื้อหา</th>
              <th class="border p-2">วันที่ประกาศ</th>
              <th class="border p-2">เวลาที่ประกาศ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(announcement, index) in announcements" :key="index">
              <td class="border p-2 text-center">{{ index + 1 }}</td>
              <td class="border p-2">{{ announcement.title }}</td>
              <td class="border p-2">{{ announcement.content }}</td>
              <td class="border p-2 text-center">{{ announcement.date }}</td>
              <td class="border p-2 text-center">{{ announcement.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>