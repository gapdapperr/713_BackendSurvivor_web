<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center">
    <div class="max-w-xl mx-auto text-center px-4">
      <h1 class="text-4xl font-bold text-red-600 mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
      <p class="text-gray-600 mb-8">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
      <router-link
        :to="{ name: 'landing-view' }"
        class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        กลับสู่หน้าหลัก
      </router-link>
    </div>
  </div>
</template>
