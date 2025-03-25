<script setup lang="ts">
import { ref } from 'vue'

const content = ref('')
defineEmits<{
  (e: 'submit', content: string): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <form @submit.prevent="$emit('submit', content)">
    <textarea
      v-model="content"
      class="w-full p-2 border rounded"
      rows="2"
      placeholder="พิมพ์ข้อความตอบกลับ..."
    />
    <div class="mt-2 space-x-2">
      <button type="submit" class="text-blue-600">ส่ง</button>
      <button type="button" @click="$emit('cancel')" class="text-gray-500">ยกเลิก</button>
    </div>
  </form>
</template>
