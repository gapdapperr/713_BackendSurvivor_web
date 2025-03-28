<script setup lang="ts">
import type { Teacher } from '@/types'
import StudentByTeacherModal from './StudentByTeacherModal.vue';
import EditTeacherModal from './EditTeacherModal.vue'


// Define props
const props = defineProps<{
  teachers: Teacher[]
  onRefresh: () => void
}>()



</script>

<template>
  <!-- Main container with shadow and rounded corners -->
  <div class="bg-white rounded-lg shadow-lg border border-gray-200">
    <!-- Table wrapper with overflow handling -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Table header -->
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ชื่อ
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ตำแหน่งทางวิชาการ
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ภาควิชา
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              จำนวนนักศึกษา
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="teacher in props.teachers"
            :key="teacher.id"
            class="hover:bg-gray-50 transition-colors duration-200"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex-shrink-0 relative w-10 h-10">
                <img
                  :src="
                    teacher.user.profile ||
                    'https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/files/uploads/user.png'
                  "
                  alt="Profile"
                  class="absolute inset-0 w-full h-full rounded-full object-cover border-2 border-gray-300 ring-2 ring-blue-500 ring-offset-2 ring-offset-white"
                />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ teacher.firstName }} {{ teacher.lastName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ teacher.academicPosition.title }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ teacher.department.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ teacher._count?.students || 0 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div  v-if="(teacher._count?.students ?? 0) > 0" >
              <StudentByTeacherModal :teacherId="teacher.id" /></div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <EditTeacherModal :Teacher="teacher" :onRefresh="props.onRefresh" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
form div {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}
button[type='button'] {
  background-color: #dc3545;
}
button[type='submit'] {
  background-color: #28a745;
}
</style>
