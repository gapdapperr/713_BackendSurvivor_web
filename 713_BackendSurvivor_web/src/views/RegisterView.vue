<script setup lang="ts">
import { ref, onMounted } from 'vue'
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import type { Department } from '@/types'
import RegisterService from '@/services/RegisterService'
import DepartmentService from '@/services/DepartmentService'

const router = useRouter()
const messageStore = useMessageStore()
const departments = ref<Department[]>([])
const profileImage = ref<File | null>(null)
const imagePreview = ref('')

// Validation schema
const validationSchema = yup.object({
  username: yup
    .string()
    .required('กรุณากรอกรหัสนักศึกษา')
    .matches(/^\d{9}$/, 'รหัสนักศึกษาต้องเป็นตัวเลข 9 หลัก'),
  password: yup.string().required('กรุณากรอกรหัสผ่าน').min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  firstName: yup.string().required('กรุณากรอกชื่อ'),
  lastName: yup.string().required('กรุณากรอกนามสกุล'),
  departmentId: yup.string().required('กรุณาเลือกภาควิชา'),
})

// Form handling
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    departmentId: '',
  },
})

// Fields
const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')
const { value: departmentId } = useField<string>('departmentId')

// Handle file upload
function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    if (file.type.match('image.*')) {
      profileImage.value = file
      imagePreview.value = URL.createObjectURL(file)
    } else {
      messageStore.updateMessage('กรุณาเลือกไฟล์รูปภาพ', 'info')
    }
  }
}

// Fetch departments
onMounted(async () => {
  try {
    const response = await DepartmentService.getDepartments()
    departments.value = response.data
  } catch (error) {
    console.error('Failed to load departments:', error)
    messageStore.updateMessage('ไม่สามารถโหลดภาควิชาได้', 'error')
  }
})

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  try {
    await RegisterService.registerStudent(
      values.username,
      values.password,
      values.firstName,
      values.lastName,
      parseInt(values.departmentId),
      profileImage.value || undefined,
    )

    router.push({ name: 'login-view' })
    messageStore.updateMessage('ลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบ', 'success')
  } catch (error: any) {
    console.error('Registration error:', error)
    const errorMessage = error.response?.data?.message || 'ไม่สามารถลงทะเบียนได้'
    messageStore.updateMessage(errorMessage, 'error')
  }
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        สร้างบัญชีผู้ใช้ใหม่
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <!-- Profile Image Upload -->
        <div class="flex flex-col items-center">
          <div class="relative w-24 h-24 mb-4">
            <img
              :src="
                imagePreview ||
                'https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/files/uploads/user.png'
              "
              class="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              alt="Profile preview"
            />
            <label
              class="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer hover:bg-indigo-500"
            >
              <input type="file" class="hidden" accept="image/*" @change="handleFileUpload" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
            </label>
          </div>
        </div>

        <!-- Username (Student ID) -->
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">
            รหัสนักศึกษา
          </label>
          <div class="mt-2">
            <InputText
              id="username"
              type="text"
              v-model="username"
              placeholder="กรอกรหัสนักศึกษา"
              :error="errors['username']"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
            รหัสผ่าน
          </label>
          <div class="mt-2">
            <InputText
              id="password"
              type="password"
              v-model="password"
              placeholder="กรอกรหัสผ่าน"
              :error="errors['password']"
            />
          </div>
        </div>

        <!-- First Name -->
        <div>
          <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">
            ชื่อ
          </label>
          <div class="mt-2">
            <InputText
              id="firstName"
              type="text"
              v-model="firstName"
              placeholder="กรอกชื่อ"
              :error="errors['firstName']"
            />
          </div>
        </div>

        <!-- Last Name -->
        <div>
          <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">
            นามสกุล
          </label>
          <div class="mt-2">
            <InputText
              id="lastName"
              type="text"
              v-model="lastName"
              placeholder="กรอกนามสกุล"
              :error="errors['lastName']"
            />
          </div>
        </div>

        <!-- Department Selection -->
        <div>
          <label for="departmentId" class="block text-sm font-medium leading-6 text-gray-900">
            ภาควิชา
          </label>
          <div class="mt-2">
            <select
              id="departmentId"
              v-model="departmentId"
              class="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              :class="{ 'ring-red-300 focus:ring-red-600': errors['departmentId'] }"
            >
              <option value="">เลือกภาควิชา</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id.toString()">
                {{ dept.name }}
              </option>
            </select>
            <p v-if="errors['departmentId']" class="mt-2 text-sm text-red-600">
              {{ errors['departmentId'] }}
            </p>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            ลงทะเบียน
          </button>
        </div>
      </form>

      <!-- Login Link -->
      <p class="mt-10 text-center text-sm text-gray-500">
        มีบัญชีผู้ใช้แล้ว?
        {{ ' ' }}
        <router-link
          :to="{ name: 'login-view' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          เข้าสู่ระบบที่นี่
        </router-link>
      </p>
    </div>
  </div>
</template>
