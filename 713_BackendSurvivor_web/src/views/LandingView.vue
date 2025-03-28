<script setup lang="ts">
const features = [
  {
    title: 'การจัดการผู้ใช้',
    description:
      'ระบบรองรับผู้ใช้ 3 ประเภท: ผู้ดูแลระบบ, อาจารย์ที่ปรึกษา, และนักศึกษา โดยมีระบบลงทะเบียนและเข้าสู่ระบบที่ปลอดภัย',
    icon: '👥',
  },
  {
    title: 'จัดการข้อมูลอาจารย์',
    description: 'ผู้ดูแลระบบสามารถสร้างและจัดการข้อมูลอาจารย์ รวมถึงตำแหน่งทางวิชาการและภาควิชา',
    icon: '👨‍🏫',
  },
  {
    title: 'การลงทะเบียนนักศึกษา',
    description: 'นักศึกษาสามารถลงทะเบียนด้วยตนเอง โดยใช้รหัสนักศึกษาเป็นชื่อผู้ใช้',
    icon: '📝',
  },
  {
    title: 'ระบบที่ปรึกษา',
    description: 'เชื่อมโยงนักศึกษากับอาจารย์ที่ปรึกษา พร้อมระบบแสดงความคิดเห็นและการตอบกลับ',
    icon: '💭',
  },
  {
    title: 'จัดการไฟล์ประกาศ',
    description: 'อาจารย์สามารถแชร์ไฟล์ประกาศให้กับนักศึกษาในที่ปรึกษาได้',
    icon: '📄',
  },
  {
    title: 'ระบบนัดหมาย',
    description: 'นักศึกษาสามารถขอนัดหมายกับอาจารย์ และอาจารย์สามารถจัดการการนัดหมายได้',
    icon: '📅',
  },
]
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <div class="relative isolate px-6 pt-10 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-40 w-auto"
          src="https://waedbkvmagwfzbzpdost.supabase.co/storage/v1/object/public/files/uploads/logo.png"
          alt="ระบบอาจารย์ที่ปรึกษา"
        />
      </div>
      <div class="mx-auto max-w-2xl py-2 sm:py-8 lg:py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            ระบบเชื่อมต่อนักศึกษากับอาจารย์ที่ปรึกษา
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            เชื่อมต่อนักศึกษาและอาจารย์ที่ปรึกษาเข้าด้วยกันอย่างมีประสิทธิภาพ
            พร้อมระบบจัดการการนัดหมายและการสื่อสารที่ครบครัน
          </p>
          <div class="mt-10 flex flex-col items-center justify-center gap-4">
            <router-link
              :to="{ name: 'register-view' }"
              class="group relative rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18h8a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17h-6v-3.777a8.935 8.935 0 00-2 .712V17a1 1 0 001 1z"
                  />
                </svg>
                ลงทะเบียนสำหรับนักศึกษา
              </span>
            </router-link>

            <div class="flex items-center gap-2 text-sm text-gray-600">
              <router-link to="/login" class="font-semibold text-indigo-600 hover:text-indigo-500">
                เข้าสู่ระบบที่นี่ <span aria-hidden="true">→</span>
              </router-link>
            </div>

            <p class="mt-2 text-xs text-gray-500">
              *การลงทะเบียนเปิดให้เฉพาะนักศึกษาเท่านั้น สำหรับอาจารย์กรุณาติดต่อผู้ดูแลระบบ
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">ฟีเจอร์หลัก</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            ทุกสิ่งที่คุณต้องการในการจัดการที่ปรึกษา
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="flex flex-col bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <dt class="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                <span class="text-3xl">{{ feature.icon }}</span>
                {{ feature.title }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">{{ feature.description }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
