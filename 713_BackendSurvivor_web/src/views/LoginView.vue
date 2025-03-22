<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const authStore = useAuthStore()
const router = useRouter()
const messageStore = useMessageStore()
const validationSchema = yup.object({
  username: yup.string().required('กรุณากรอกชื่อผู้ใช้'),
  password: yup.string().required('กรุณากรอกรหัสผ่าน').min(5, 'รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร'),
})

const redirectToDashboard = () => {
  if (authStore.isAdmin) {
    router.push({ name: 'admin-dashboard-view' })
  } else if (authStore.isTeacher) {
    router.push({ name: 'teacher-dashboard-view' })
  } else if (authStore.isStudent) {
    router.push({ name: 'student-dashboard-view' })
  } else {
    // Fallback if role is not recognized
    messageStore.updateMessage('ไม่มีสิทธิ์เข้าใช้งานระบบ')
    authStore.logout()
  }
}

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    password: '',
  },
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit(async (values: { username: string; password: string }) => {
  try {
    await authStore.login(values.username, values.password)
    redirectToDashboard()
  } catch (error) {
    messageStore.updateMessage('ไม่สามารถเข้าสู่ระบบได้')
    setTimeout(() => {
      messageStore.resetMessage()
    }, 3000)
  }
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg"
        alt="ระบบอาจารย์ที่ปรึกษา"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        เข้าสู่ระบบ
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900"
            >ชื่อผู้ใช้</label
          >
          <div class="mt-2">
            <InputText
              id="username"
              type="username"
              v-model="username"
              placeholder="กรอกชื่อผู้ใช้"
              :error="errors['username']"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >รหัสผ่าน</label
            >
            <!-- <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
                >ลืมรหัสผ่าน?</a
              >
            </div> -->
          </div>
          <div class="mt-2">
            <InputText
              type="password"
              v-model="password"
              placeholder="กรอกรหัสผ่าน"
              :error="errors['password']"
              autocomplete="false"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
        ยังไม่มีบัญชีผู้ใช้?
        {{ ' ' }}
        <router-link
          :to="{ name: 'register-view' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          ลงทะเบียนที่นี่
        </router-link>
      </p>
    </div>
  </div>
</template>
