<script setup lang="ts">
import type { Teacher } from '@/types'
import StudentByTeacher from './StudentByTeacher.vue'
import EditTeacherModal from './EditTeacherModal.vue'


// Define props
const props = defineProps<{
  teachers: Teacher[]
  onRefresh: () => void
}>()



</script>

<template>
  <!-- Teacher List Table -->
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Position</th>
        <th>Department</th>
        <th>Number of Students</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="teacher in props.teachers" :key="teacher.id">
        <td>{{ teacher.user.profile }}</td>
        <td>{{ teacher.firstName + ' ' + teacher.lastName }}</td>
        <td>{{ teacher.academicPosition.title }}</td>
        <td>{{ teacher.department.name }}</td>
        <td>{{ teacher._count?.students }}</td>
        <td><StudentByTeacher :teacherId="teacher.id" /></td>
        <td><EditTeacherModal :Teacher="teacher" :onRefresh="props.onRefresh"/></td>
      </tr>
    </tbody>
  </table>
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
