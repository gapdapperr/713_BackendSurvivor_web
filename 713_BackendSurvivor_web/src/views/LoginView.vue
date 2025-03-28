<script setup lang="ts">
import { ref } from 'vue'
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const authStore = useAuthStore()
const router = useRouter()
const messageStore = useMessageStore()
const isLoading = ref(false)
const validationSchema = yup.object({
  username: yup.string().required('กรุณากรอกชื่อผู้ใช้'),
  password: yup.string().required('กรุณากรอกรหัสผ่าน').min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
})

const redirectToDashboard = () => {
  if (authStore.isAdmin) {
    router.push({ name: 'admin-dashboard-view' })
  } else if (authStore.isTeacher) {
    router.push({ name: 'teacher-dashboard-view' })
  } else if (authStore.isStudent) {
    router.push({ name: 'student-dashboard-view' })
  } else {
    messageStore.updateMessage('ไม่มีสิทธิ์เข้าใช้งานระบบ', 'error')
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
    isLoading.value = true
    await authStore.login(values.username, values.password)
    messageStore.updateMessage('เข้าสู่ระบบสำเร็จ', 'success')
    redirectToDashboard()
  } catch (error: any) {
    if (error.response?.status === 401) {
      messageStore.updateMessage('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error')
    } else {
      const errorMessage = error?.response?.data?.message || 'ไม่สามารถเข้าสู่ระบบได้'
      messageStore.updateMessage(errorMessage, 'error')
    }
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-40 w-auto"
        src="https://waedbkvmagwfzbzpdost.supabase.co/storage/v1/object/public/files/uploads/logo.png"
        alt="ระบบอาจารย์ที่ปรึกษา"
      />
      <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        เข้าสู่ระบบ
      </h2>
    </div>
    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
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
        <!-- Message Alert -->
        <div
          v-if="messageStore.message"
          :class="[
            'mb-4 p-4 rounded-md border',
            {
              'bg-red-50 border-red-200 text-red-600': messageStore.type === 'error',
              'bg-green-50 border-green-200 text-green-600': messageStore.type === 'success',
              'bg-blue-50 border-blue-200 text-blue-600': messageStore.type === 'info',
            },
          ]"
        >
          <p class="text-sm">{{ messageStore.message }}</p>
        </div>
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <template v-if="isLoading">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              กำลังเข้าสู่ระบบ...
            </template>
            <template v-else> เข้าสู่ระบบ </template>
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
