<script setup lang="ts">
import PositionService from '@/services/PositionService'
import DepartmentService from '@/services/DepartmentService'
import TeacherService from '@/services/teacherService'
import { ref } from 'vue'

const props = defineProps<{
  onRefresh: () => void
}>()

// Modal visibility state
const selectedFile = ref<File | null>(null)
const showModal = ref(false)
const newTeacher = ref({
  firstName: '',
  lastName: '',
  academicPositionId: '',
  departmentId: '',
  username: '',
  password: '',
})

// Function to handle file selection
function handleFileSelection(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    selectedFile.value = file // Store the selected file
  }
}

// Function to open the modal
const openModal = () => {
  showModal.value = true
}

// Function to close the modal
const closeModal = () => {
  showModal.value = false
  newTeacher.value = {
    firstName: '',
    lastName: '',
    academicPositionId: '',
    departmentId: '',
    username: '',
    password: '',
  }
}

async function AddTeacher() {
  const teacherData = new FormData()
  teacherData.append('firstName', newTeacher.value.firstName)
  teacherData.append('lastName', newTeacher.value.lastName)
  teacherData.append('academicPositionId', newTeacher.value.academicPositionId)
  teacherData.append('departmentId', newTeacher.value.departmentId)
  teacherData.append('username', newTeacher.value.username)
  teacherData.append('password', newTeacher.value.password)
  console.log(teacherData)
  if (selectedFile.value) {
    teacherData.append('profile', selectedFile.value) // Append the file
  }

  try {
    const response = await TeacherService.addTeacher(teacherData)
    console.log(response.data)
    props.onRefresh()
    closeModal()
  } catch (error) {
    console.log(error)
  }
}

const availablePosition = ref()
const availableDepartment = ref()

async function fetchPositions() {
  try {
    const response = await PositionService.getPositions()
    availablePosition.value = response.data
  } catch (error) {
    console.log(error)
  }
}

async function fetchDepartments() {
  try {
    const response = await DepartmentService.getDepartments()
    availableDepartment.value = response.data
  } catch (error) {
    console.log(error)
  }
}

fetchDepartments()
fetchPositions()
</script>

<template>
  <div>
    <button @click="openModal">เพิ่มอาจารย์</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>Add Teacher</h3>
        <form @submit.prevent="closeModal">
          <div>
            <label for="firstName">firstName:</label>
            <input v-model="newTeacher.firstName" type="text" id="firstName" required />
          </div>
          <div>
            <label for="lastName">lastName:</label>
            <input v-model="newTeacher.lastName" type="text" id="lastName" required />
          </div>
          <div>
            <label for="position">Academic Position:</label>
            <select v-model="newTeacher.academicPositionId" name="position" id="position">
              <option value="" disabled>Please select position</option>
              <option v-for="position in availablePosition" :key="position.id" :value="position.id">
                {{ position.title }}
              </option>
            </select>
          </div>
          <div>
            <label for="department">Department:</label>
            <select v-model="newTeacher.departmentId" name="department" id="department">
              <option value="" disabled>Please select department</option>
              <option
                v-for="department in availableDepartment"
                :key="department.id"
                :value="department.id"
              >
                {{ department.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="username">Username:</label>
            <input v-model="newTeacher.username" type="text" id="username" required />
          </div>
          <div>
            <label for="password">Password:</label>
            <input v-model="newTeacher.password" type="text" id="password" required />
          </div>
          <div>
  <label for="profile" class="upload-btn">Upload Profile Picture</label>
  <input type="file" id="profile" name="filename" style="display: none" accept="image/*" onchange="this.nextElementSibling.textContent = this.files[0]?.name || ''" />
  <span class="file-name"></span>
</div>

          <div>
            <button type="submit" @click="AddTeacher">Submit</button>
            <button type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Basic styling for the modal */
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

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.modal form {
  display: flex;
  flex-direction: column;
}

.modal form div {
  margin-bottom: 10px;
}

button {
  margin: 5px;
  padding: 8px 12px;
  cursor: pointer;
}

button[type='submit'] {
  background-color: #4caf50;
  color: white;
}

button[type='button'] {
  background-color: #f44336;
  color: white;
}

/* Style the file upload button */
.upload-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  display: inline-block;
}

.upload-btn:hover {
  background-color: #45a049;
}
</style>
