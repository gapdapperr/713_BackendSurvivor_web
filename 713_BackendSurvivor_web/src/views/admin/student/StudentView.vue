<script setup lang="ts">
import StudentTable from '@/components/StudentTable.vue'

const students = [
  {
    id: 1,
    studentId: '610001',
    firstName: 'Cy',
    lastName: 'Ganderton',
    profilePicture: 'https://via.placeholder.com/40',
    department: 'Computer Science',
    advisor: 'Dr. Smith',
  },
  {
    id: 2,
    studentId: '610002',
    firstName: 'Hart',
    lastName: 'Hagerty',
    profilePicture: 'https://via.placeholder.com/40',
    department: 'Information Technology',
    advisor: 'Dr. Johnson',
  },
  {
    id: 3,
    studentId: '610003',
    firstName: 'Brice',
    lastName: 'Swyre',
    profilePicture: 'https://via.placeholder.com/40',
    department: 'Software Engineering',
    advisor: 'Dr. Brown',
  },
]
</script>

<template>
  <div class="dashboard p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">จัดการข้อมูลนักศึกษา</h2>
    <StudentTable :students="students" />
  </div>
</template>

<style scoped>
/* Add custom styles if needed */
</style>
